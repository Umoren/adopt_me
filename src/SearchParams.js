import React, { useState, useContext, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import Results from './Results'
;import useDropdown from './useDropdown';
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
    const [theme, setTheme] = useContext(ThemeContext);
    const [location, setLocation] = useState("Seattle, WA");
    const [breeds, setBreeds] = useState([]);
    const [pets, setPets] = useState([]);
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
    

    async function requestPets() {
        const { animals } = await pet.animals({
          location,
          breed,
          type: animal
        });
    
        console.log("animals", animals);
    
        setPets(animals || []);
    }

   useEffect(() => {
       setBreeds([]);
       setBreed("");

       pet.breeds(animal).then(({ breeds }) => {
           const breedStrings = breeds.map(({ name }) => name);
           setBreeds(breedStrings);
       }, console.error)
   }, [animal, setBreed, setBreeds]);
  
    return (
        <div className="search-params">
               <form
                    onSubmit={e => {
                        e.preventDefault();
                        requestPets();
                }}>
                <label htmlFor="location">
                    Location 
                    <input  
                        id="location" 
                        value={location} 
                        placeholder="Location"
                        onChange={event => setLocation(event.target.value)}
                    />
                </label>
                <AnimalDropdown />
                <BreedDropdown />
                <label htmlFor="location">
                    Theme
                    <select
                        value={theme}
                        onChange={e => setTheme(e.target.value)}
                        onBlur={e => setTheme(e.target.value)}
                    >
                        <option value="peru">Peru</option>
                        <option value="darkblue">Dark Blue</option>
                        <option value="chartreuse">Chartreuse</option>
                        <option value="mediumorchid">Medium Orchid</option>
                    </select>
                </label>

                <button style={{ backgroundColor: theme }} >Submit</button>
      
            </form>
            <Results pets={pets} />
        </div>
    )
}

export default SearchParams;