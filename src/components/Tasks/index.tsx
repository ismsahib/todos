import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { TaskData } from '../../types';

type TasksProps = {
  tasks: TaskData[];
  handleToggleState: (id: string) => void;
};
export const Tasks: React.FC<TasksProps> = ({ tasks, handleToggleState }) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {tasks.map((task) => {
        return (
          <ListItem
            key={task.id}
            disablePadding
            sx={{
              borderBottom: 1,
              borderColor: 'rgb(0,0,0,0.2)',
            }}>
            <ListItemButton role={undefined} onClick={() => handleToggleState(task.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.state === 'completed'}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': `checkbox-list-label-${task.id}` }}
                />
              </ListItemIcon>
              <ListItemText
                id={`checkbox-list-label-${task.id}`}
                primary={<Typography sx={{ wordWrap: 'break-word' }}>{task.title}</Typography>}
                sx={{
                  textDecoration: task.state === 'completed' ? 'line-through' : undefined,
                  opacity: task.state === 'completed' ? 0.6 : undefined,
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
