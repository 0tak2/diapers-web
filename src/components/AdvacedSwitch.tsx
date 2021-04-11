import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import qs from 'qs';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function AdvancedSwitch({ history, location }: RouteComponentProps) {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const advanced = query.advanced === 'true';
    
    const handleChange = () => {
        if (advanced) {
            history.push(location.pathname);
        } else {
            history.push(location.pathname + '?advanced=true');
        }
    };

    return (
        <FormControlLabel
            control={
            <Switch
                checked={advanced}
                onChange={handleChange}
                color="primary"
            />
            }
            label="기간별 조회"
        />
    );
}

export default withRouter(AdvancedSwitch);