import React,{Component} from 'react';
import {Scene,Router} from 'react-native-router-flux';
import Login from './APP/Views/Login';
import App from './APP/Views/App';
import WorkFiles from './APP/Views/WorkFiles';
import LifeFiles from './APP/Views/LifeFiles';
import MarkdownEditor from './APP/Component/MDEditor';
import Mine from './APP/Views/Mine';
import FriendsList from './APP/Views/FriendsList';

export default class Route extends Component <{}> {
	render(){
		return (
			<Router>
				<Scene key="root"  hideNavBar={true}>
					<Login key="Login" component={Login} initial={true}/>
					<Scene key='App' component={App}/>		
					<Scene key='WorkFiles' component={WorkFiles} />
					<Scene key='MarkdownEditor' component={MarkdownEditor} />
					<Scene key='Mine' component={Mine} />
					<Scene key='FriendsList' component={FriendsList} />
				</Scene>
			</Router>
		)
	}
} 
