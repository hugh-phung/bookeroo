
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Header} from '../Header/Header';
import {Homepage} from '../Homepage/Homepage';
import {Login} from '../Login/Login';
import {Register} from '../Register/Register';
import {NavigationBar} from '../Navbar/Navbar';
import { Header2 } from '../Header2/Header2';
import { Management } from '../Management/Management';
import { SessionUserProvider } from '../../Context/SessionUserContext';
import { ManageBooks } from '../Management/ManageBooks';
import { ManageUsers } from '../Management/ManageUsers';
import { AddBooks } from '../Management/AddBooks';
import { Book } from '../Book/Book';
import { RegisterBusiness } from '../Register/RegisterBusiness';
import { Genre } from '../Genre/Genre';
import { Search } from '../Search/Search';
import { MyListings } from '../My-Listings/MyListings';
import { CreateListing } from '../CreateListing/CreateListing';
import { Cart } from '../Cart/Cart';
import { Footer } from '../Footer/Footer';
import { PurchaseHistory } from '../Profile/PurchaseHistory';
import { SellerHistory } from '../Profile/SellerHistory';
import { ProfileDashBoard } from '../Profile/ProfileDashBoard';
import { About } from '../About/About';





function App() 
{

  return (
    
    <div>
      <SessionUserProvider>
        <Router>
        <Header />
        <Header2 />
        <NavigationBar/>
          <Switch>
            <Route path="/login" component={()=> <Login/>}/>
            <Route path="/register/business" component={()=> <RegisterBusiness/>}/>
            <Route path="/register" component={()=> <Register/>}/>
            <Route path="/book/:bookID" component={() => <Book/>}/>
            <Route path="/genre/:genreParam" component={() => <Genre/>}/>
            <Route path="/search/:searchInput" component={() => <Search/>}/>
            <Route path="/orders/purchase-history" component={()=> <PurchaseHistory/>}/>
            <Route path="/orders/seller-history" component={()=> <SellerHistory/>}/>
            <Route path='/profile' component={()=> <ProfileDashBoard/>}/>
            <Route path="/management/books/add" component={()=> <AddBooks/>}/>
            <Route path="/management/books" component={()=> <ManageBooks/>}/>
            <Route path="/management/users" component={()=> <ManageUsers/>}/>
            <Route path="/management" component={()=> <Management/>}/>
            <Route path="/create-listing" component={()=> <CreateListing/>}/>
            <Route path="/my-listings" component={()=> <MyListings/>}/>
            <Route path="/cart" component={()=> <Cart/>}/>
            <Route path="/about-us" component={()=> <About/>}/>
            <Route path="/" component={()=> <Homepage/> }/>
          </Switch>
        </Router>
        <Footer/>
      </SessionUserProvider>

      
    </div>
  );
}

export default App;
