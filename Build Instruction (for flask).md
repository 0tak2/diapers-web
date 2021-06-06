Build Instruction (for flask)
===

1. yarn 커맨드로 build 한다.
```
> yarn build
```

2. build 디렉토리의 내용물을 build-for-flask 디렉토리로 옮긴다. (기존 build-for-flask의 내용물은 삭제해도 된다.)

3. build-for-flask 디렉토리 내부 static 디렉토리의 모든 내용물을 build-for-flask 디렉토리 루트로 옮기고, static 디렉토리는 삭제한다.

4. build-for-flask 디렉토리 루트의 index.html을 열어 아래 내용을 수정한다.

```
<link rel="manifest" href="/manifest.json"/>
를
<link rel="manifest" href="/static/manifest.json"/>
으로
```

5. 프로덕션 프로젝트의 static 디렉토리에서 semantic, doc 디렉토리를 제외한 모든 내용물을 삭제한다.

6. 프로덕션 프로젝트의 static 디렉토리에 build-for-flask 디렉토레의 내용물 전체를 복사한다.