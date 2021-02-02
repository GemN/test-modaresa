import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { connect } from 'react-redux'
import { Navbar } from './components/Navbar'
import { Brands } from './components/Brands'

function App() {
  return (
    <div>
      <Navbar/>
      <Brands/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {...state};
}
export default connect(mapStateToProps, null)(App)

