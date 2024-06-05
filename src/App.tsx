import { Box, Button, Container, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { TaskData } from './types';
import { Tasks } from './components/Tasks';
import { v4 as uuidv4 } from 'uuid';
import { isValidData } from './helpers/isValidData';

const App = () => {
  const [data, setData] = useState<{
    initialData: boolean;
    tasks: TaskData[];
  }>({ initialData: true, tasks: [] });

  const [tab, setTab] = useState<'all' | 'active' | 'completed'>('all');
  const [inputValue, setInputValue] = useState<string>('');

  const handleChangeTabs = (_event: React.SyntheticEvent, newTab: 'all' | 'active' | 'completed') => {
    setTab(newTab);
  };
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleToggleState = (id: string) => {
    const newTasks: TaskData[] = data.tasks.map((t) => {
      if (t.id === id) {
        return { ...t, state: t.state === 'active' ? 'completed' : 'active' };
      }
      return t;
    });
    setData({ initialData: false, tasks: newTasks });
  };

  const handleClickClearCompletedTasks = () => {
    setData({ initialData: false, tasks: data.tasks.filter((t) => t.state !== 'completed') });
  };
  const handleClickAddNewTask = () => {
    if (inputValue.length) {
      setData({ initialData: false, tasks: [...data.tasks, { id: uuidv4(), state: 'active', title: inputValue }] });
      setInputValue('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue.length) {
      setData({ initialData: false, tasks: [...data.tasks, { id: uuidv4(), state: 'active', title: inputValue }] });
      setInputValue('');
    }
  };

  const getFilteredTasksByTab = (t: 'all' | 'active' | 'completed', initialTasks: TaskData[]): TaskData[] => {
    if (t === 'active') return initialTasks.filter((v) => v.state === 'active');
    if (t === 'completed') return initialTasks.filter((v) => v.state === 'completed');
    return [...initialTasks];
  };

  const filteredTasksByTab = useMemo(() => getFilteredTasksByTab(tab, data.tasks), [tab, data]);

  useEffect(() => {
    if (!data.initialData) {
      localStorage.setItem('tasks', JSON.stringify(data.tasks));
    }
  }, [data]);

  useEffect(() => {
    const tasksFromLocalStorage = localStorage.getItem('tasks');

    if (tasksFromLocalStorage && isValidData(tasksFromLocalStorage)) {
      const newTasks = JSON.parse(tasksFromLocalStorage) as TaskData[];
      setData({ initialData: false, tasks: newTasks });
    }
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 2,
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}>
        <Typography variant="h4">TODOS</Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}>
          <TextField
            id="outlined-basic"
            label="What needs to be done?"
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
          <Button variant="contained" size="small" disabled={inputValue.length === 0} onClick={handleClickAddNewTask}>
            Add
          </Button>
        </Box>
        <Tabs value={tab} onChange={handleChangeTabs} aria-label="tabs">
          <Tab value="all" label="All" />
          <Tab value="active" label="Active" />
          <Tab value="completed" label="Completed" />
        </Tabs>
        <Tasks tasks={filteredTasksByTab} handleToggleState={handleToggleState} />
        <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleClickClearCompletedTasks}
            disabled={data.tasks.filter((t) => t.state === 'completed').length === 0}>
            Clear completed
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
