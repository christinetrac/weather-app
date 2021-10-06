import './App.css';
import React, { useState, useEffect } from "react";
import vector1 from "./assets/vector1.svg";
import vector2 from "./assets/vector2.svg";
import vector3 from "./assets/vector3.svg";
import Select from 'react-select';
import MaterialIcon from 'material-icons-react';
import axios from 'axios';

function App() {
    const [currentCityData, setCurrentCityData] = useState({});

    async function fetchData(cityValue) {
        try {
            const response = await axios.get('http://localhost:5000/get-weather', {
                params: {
                    cityValue: cityValue
                }
            });
            setCurrentCityData(response?.data?.data[0]);
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleCitySelection = (city) => {
        fetchData(city.value);
    };

    useEffect(() => {
        fetchData('toronto&country=canada');
    }, []);

    const options = [
        { value: 'toronto&country=canada', label: 'Toronto' },
        { value: 'newyork', label: 'New York' },
        { value: 'losangeles', label: 'Los Angeles' },
        { value: 'chicago', label: 'Chicago' },
        { value: 'phoenix', label: 'Phoenix' },
        { value: 'vancouver&country=canada', label: 'Vancouver' },
        { value: 'seattle', label: 'Seattle' },
        { value: 'bangkok', label: 'Bangkok' },
        { value: 'paris', label: 'Paris' },
        { value: 'tokyo', label: 'Tokyo' },
        { value: 'shanghai', label: 'Shanghai' },
        { value: 'dubai', label: 'Dubai' },
    ];

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            paddingLeft: 30,
            color: '#4E4E4F',
        }),
        control: () => ({
            background: '#FEF2FF',
            borderRadius: 100,
            height: 62,
            width: 380,
            color: '#4E4E4F',
        }),
        container: (provided) => ({
            ...provided,
            position: 'absolute',
            left: 92,
            top: 28,
            fontFamily: ["Manrope", "sans-serif"].join(","),
            fontSize: 35,
            fontWeight: 700,
            color: '#4E4E4F',
            textAlign: 'left',
        }),
        valueContainer: (provided) => ({
            ...provided,
            paddingLeft: 30,
            color: '#4E4E4F',
        }),
        dropdownIndicator: (provided, state) => ({
            display: 'none'
        }),
    };

    return (
    <div className="App">
      <img src={vector1} alt="" className="vector1"/>
      <img src={vector2} alt="" className="vector2"/>
      <img src={vector3} alt="" className="vector3"/>
      <div className="copyright">Developed and designed by Christine Trac for On Deck</div>
      <div className="container">
          <div className="tab">
              <div className="locationIcon">
                  <MaterialIcon icon="location_on" size={45} color='#4E4E4F' />
              </div>
              <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={options[0]}
                  isClearable={false}
                  isSearchable={true}
                  name="color"
                  options={options}
                  styles={customStyles}
                  theme={(theme) => ({
                      ...theme,
                      colors: {
                          ...theme.colors,
                          text: '#4E4E4F',
                          primary25: '#FEF2FF',
                          primary: '#9E9FFF',
                      },
                  })}
                  onChange={(e) => handleCitySelection(e)}
              />
          </div>
          <div className="weatherCard">
            <div className="circle">
                <img src={`/icons/${currentCityData?.weather?.icon}.png`} className="weatherIcon" alt=""/>
            </div>
            <div className="weather">
                <div className="currentWeather">
                    {Math.round(currentCityData?.temp)}
                    <span> °C</span>
                </div>
                <div className="apparentWeather">
                    and feels like {Math.round(currentCityData?.app_temp)}
                    <span> °C</span>
                </div>
            </div>
            <div className="weatherDescription">
                {currentCityData?.weather?.description}
            </div>
          </div>
          <div className="ruler"/>
      </div>
    </div>
  );
}

export default App;
