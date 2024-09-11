import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Typography } from '@mui/material';

export default function WarningTimeLine({ warnings }) {
    return (

        <Timeline position="alternate">
            {warnings.map(item => (
                <>
                    <Typography sx={{textAlign:'center' , mt:2}}>
                        Month : {item.date.split('-').splice(1, 1).join('-')}
                    </Typography>
                    <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                            {item.date}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            {item.description}
                        </TimelineContent>
                    </TimelineItem>
                </>
            ))}

        </Timeline>
    );
}
