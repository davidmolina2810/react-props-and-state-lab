import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  fetchPets = () => {
    let url = "/api/pets"
    let current = this.state.filters.type
    if (current === 'all') {
      fetch("/api/pets").then(res => res.json() ).then( data => this.setState({pets: data}))
    } else if (current === 'cat') {
      fetch(`${url}?type=cat`).then(res => res.json() ).then( data => this.setState({pets: data}))
    } else if (current === 'dog') {
      fetch(`${url}?type=dog`).then(res => res.json() ).then( data => this.setState({pets: data}))
    } else if (current === 'micropig') {
      fetch(`${url}?type=micropig`).then(res => res.json() ).then( data => this.setState({pets: data}))
    }
  }

  adoptPet = (id) => {
    const pet = this.state.pets.find( pet => pet.id === id )
    pet.isAdopted = true
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              onAdoptPet={this.adoptPet}
              pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
