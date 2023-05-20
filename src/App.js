import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ProductListing from "./containers/ProductListing"
import UploadComponent from "./containers/UploadComponent"
import Header from "./containers/Header"
import "./App.css"
import ProductDetails from "./containers/ProductDetails"

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact component={UploadComponent} />
                    <Route path="/list" exact component={ProductListing} />
                    <Route path="/list/:productId" component={ProductDetails} />
                    <Route>404 Not Found!</Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
