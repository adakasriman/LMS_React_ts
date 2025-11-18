import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextInput from '@components/common/TextInput';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const CommonComponents = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      className="w-full"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: 'calc(100vh - 90px)',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className="w-1/5"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Text field" {...a11yProps(0)} />
        <Tab label="Select" {...a11yProps(1)} />
      </Tabs>
      <div className="w-4/5 overflow-y-auto">
        <TabPanel value={value} index={0}>
          <h2>Description:</h2>
          <p>
            <strong>TextInput</strong> is a reusable wrapper around Material-UI’s
            <code>TextField</code> component. It helps maintain consistent input styling across the
            application and provides built-in error handling. You can use it in any form or page
            that requires text input (like login, signup, or data entry forms).
          </p>

          <h3>Props:</h3>
          <ul>
            <li>
              <strong>label</strong> (<code>string</code>): The label text displayed above the input
              field.
            </li>
            <li>
              <strong>errorText</strong> (<code>string</code>): Optional error message shown below
              the field. If provided, the field appears in an error state.
            </li>
            <li>
              <strong>value</strong> (<code>string | number</code>): The current value of the input
              (for controlled components).
            </li>
            <li>
              <strong>onChange</strong> (
              <code>(e: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void</code>): Callback
              triggered when the input value changes.
            </li>
            <li>
              <strong>variant</strong> (<code>'outlined' | 'filled' | 'standard'</code>): Defines
              the Material UI style variant for the text field. Defaults to <code>'outlined'</code>.
            </li>
            <li>
              <strong>...props</strong>: Accepts all other Material UI <code>TextField</code> props
              (e.g., <code>placeholder</code>, <code>type</code>, <code>disabled</code>, etc.).
            </li>
          </ul>

          <h3>Default Behavior:</h3>
          <ul>
            <li>
              Uses <code>variant="outlined"</code> by default.
            </li>
            <li>
              Automatically shows an error message if <code>errorText</code> is provided.
            </li>
            <li>
              Uses <code>size="small"</code> and <code>fullWidth</code> for consistent appearance.
            </li>
          </ul>

          <TextInput label="Name" dataInput="numeric" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h3>Description:</h3>
          <p>
            <strong>SelectInput</strong> is a reusable wrapper around Material-UI’s
            <code>Select</code> component. It helps maintain consistent dropdown styling across the
            application and provides built-in label, validation, and error handling. You can use it
            wherever a select/dropdown input is needed (e.g., role selection, category filters, or
            form fields).
          </p>

          <h3>Props:</h3>
          <ul>
            <li>
              <strong>label (string):</strong> The text displayed above the select field.
            </li>
            <li>
              <strong>value (string | number):</strong> The current selected value (for controlled
              components).
            </li>
            <li>
              <strong>
                onChange ((event: SelectChangeEvent&lt;string | number&gt;) =&gt; void):
              </strong>
              Callback triggered when the user selects a new option.
            </li>
            <li>
              <strong>
                options (Array&lt;{`{`} label: string; value: string | number {`}`}&gt;):
              </strong>
              Array of options to be displayed inside the dropdown.
            </li>
            <li>
              <strong>errorText (string):</strong> Optional error message shown below the field.
              When provided, the field appears in an error state.
            </li>
            <li>
              <strong>variant ('outlined' | 'filled' | 'standard'):</strong>
              Defines the Material UI style variant for the select field. Defaults to
              <code>'outlined'</code>.
            </li>
            <li>
              <strong>fullWidth (boolean):</strong> Expands the component to take up the full width
              of its container. Defaults to <code>true</code>.
            </li>
            <li>
              <strong>size ('small' | 'medium'):</strong> Sets the size of the select field.
              Defaults to <code>'small'</code>.
            </li>
            <li>
              <strong>name (string):</strong> The name attribute for form submission or integration.
            </li>
          </ul>

          <h3>Default Behavior:</h3>
          <ul>
            <li>
              Uses <code>variant="outlined"</code>, <code>fullWidth</code>, and{' '}
              <code>size="small"</code> by default.
            </li>
            <li>
              Displays an error message and red border when <code>errorText</code> is provided.
            </li>
            <li>
              Dynamically renders <code>MenuItem</code> options based on the <code>options</code>{' '}
              array.
            </li>
          </ul>

          <h3>Example Usage:</h3>
          <pre>
            <code className="language-tsx">
              {`<SelectInput
                label="User Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { label: 'Admin', value: 'admin' },
                  { label: 'Manager', value: 'manager' },
                  { label: 'User', value: 'user' },
                ]}
                errorText={!role ? 'Please select a role' : ''}
              />`}
            </code>
          </pre>
        </TabPanel>
      </div>
    </Box>
  );
};

export default CommonComponents;
