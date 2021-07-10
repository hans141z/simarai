import  {
	Route, 
	NavLink,
	HashRouter, 
	Redirect
} from 'react-router-dom';

import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Grain from "./Grain.js";
import View from "./View.js"

function App() {
  return (
	<HashRouter>
		<div className = "header">
			<h1>SimArai</h1>
	  		<ul className = "navBar">
				<li className = "view"><NavLink to = "/create" className = "desc" activeClassName="selected" >Create</NavLink></li>
				<li className = "view"><NavLink to = "/view" className = "desc" activeClassName="selected"> View</NavLink></li>
			</ul>

	  	</div>

	  	<div className="body">
	  		<Redirect from = "/" to ="/create" />
	  		<Route path = "/create" component = {Grain} />
	  		<Route path = "/view" component = {View} />
	  	</div>
	</HashRouter>

  );
}

export default App;
