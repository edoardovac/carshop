import Carlist from "./components/Carlist";
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {

  // 1. remove all unused content (also from css files)
  // 2. create component folder (name can change from company to company)
  // In there create Carlist.jsk component (continues there)

  // 10. import and render Carlist
  // 11. check on browser console if component is there (go back to CarList)

  // 15. import Container and AppBar and set both
  // 16. check that everything is showing (go back to CarList)


  return (
    <>
      <Container maxWidth='xl'>
        <AppBar position="static">
          <Toolbar>
            <Typography variant='h6'>Car Shop</Typography>
          </Toolbar>
        </AppBar>
        <Carlist />
      </Container>
    </>
  )
}

export default App
