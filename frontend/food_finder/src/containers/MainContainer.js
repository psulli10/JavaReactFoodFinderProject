import React, {Component} from 'react'
import Request from '../helpers/Request'
import HomeContainer from './HomeContainer'
import SignIn from '../components/SignIn'
import SignUpContainer from './SignUpContainer'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import InOutContainer from './InOutContainer'
import InContainer from './eat_in/InContainer'
import InRecipeContainer from './eat_in/InRecipeContainer'
import OutContainer from './eat_out/OutContainer'
import OutRestaurantContainer from './eat_out/OutRestaurantContainer'
import Urls from '../helpers/keys/Urls'


class MainContainer extends Component {
    constructor(props){
      super(props)
      this.state = {
        user: "User",
        recipiesList: [],
        selectedRecipe: null,
        restaurantList: [],
        selectedRestaurant: null
      }
      this.findUserById = this.findUserById.bind(this);
      this.createNewUser = this.createNewUser.bind(this);
      this.getRecipeList = this.getRecipeList.bind(this);
      this.findSelectedRecipe = this.findSelectedRecipe.bind(this);
      this.getRestaurantList = this.getRestaurantList.bind(this);
      this.findSelectedRestaurant = this.findSelectedRestaurant.bind(this);
    }

//Log in details from Home page
    findUserById(id){
      const url = "/api/users/"+id
      const request = new Request
      request.get(url)
      .then(user => this.setState({user: user}))
      .catch(err => console.error)
      .then(window.location = '/in-out');

          {/*Test above after db set up*/}
    }
    createNewUser(user){
      const url = "/api/users"
      const request = new Request
      request.post(url, user)
      .then(user => this.setState({user: user}))
      .catch(err => console.error)
      .then(window.location = '/in-out');

        {/* above does not have id, which needs to be returned from db */}
    }
    //Button on home to re-direct to create new user
      viewNew(){
        window.location = '/new';
      }


//recipe for eat in, from InOutContainer
    getRecipeList(){
      const url = new Urls
      fetch(url.urlTest())
      .then(res => res.json())
      .then(recipies => this.setState({recipiesList: recipies.meals}))
      .catch(err => console.log(err));
    }
    findSelectedRecipe(id) {
      const url = new Urls
      fetch(url.getRecipeById(id))
      .then(res => res.json())
      .then(recipies => this.setState({selectedRecipe: recipies.meals[0]}))
      // .then(window.location = '/in/recipe')
      .catch(err => console.log(err));

    }


//restaurant for eat out, from InOutContainer
    getRestaurantList(){
      const url = new Urls
      fetch(url.urlTestRestaurant())
      .then(res => res.json())
      .then(restuarants => this.setState({restaurantList: restuarants.restaurants}))
      .catch(err => console.log(err));
    }
    findSelectedRestaurant(id){
      const restaurant = this.state.restaurantList[id];
      this.setState({selectedRestaurant: restaurant})
    }





    render(){
      return (
        <div className="main-app">
         <Router>
          <Switch>
            <Route exact path="/home"
            render={() => <HomeContainer findUserByIdMain={this.findUserById} switchToSignUpContainer={this.viewNew}/>}
            />
            <Route exact path="/new"
            render={() => <SignUpContainer signUpMain={this.createNewUser} />}
            />
                        {/* change above address to have user id */}
            <Route exact path="/in-out"
            render={() => <InOutContainer user={this.state.user} getRecipeList={this.getRecipeList} getRestaurantList={this.getRestaurantList}/>}
            />

            <Route  exact path="/in"
            render={() => <InContainer user={this.state.user} recipiesList={this.state.recipiesList} findSelectedRecipe={this.findSelectedRecipe}/>}
            />
            <Route exact path="/in/recipe"
            render={() => <InRecipeContainer user={this.state.user} selectedRecipe={this.state.selectedRecipe}/>}
            />
            <Route exact path="/out"
            render={() => <OutContainer user={this.state.user} restaurantList={this.state.restaurantList} findSelectedRestaurant={this.findSelectedRestaurant}/>}
            />
            <Route exact path="/out/restaurant"
            render={() => <OutRestaurantContainer user={this.state.user}  selectedRestaurant={this.state.selectedRestaurant}/>}
            />
          </Switch>
         </Router>
        </div>
      )
    }

}

export default MainContainer