import React , {useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import { styled  } from '@mui/system';
import Button from '@mui/material/Button';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import {NavigateBefore,NavigateNext,Public,Translate,Paid, EmojiEmotions, Flag, Code, Place, Delete, FilterAlt, Search, Cancel, Favorite, ThumbUp } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import colors from '../colors/Colors'

// Application uses MUI input for getting data from client. This fields provides color change function.
const CustomTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    fieldset {
      border-color: red; // Kenarlık rengini burada özelleştirin
    }
    :hover fieldset {
        border-color: red; // Kenarlık rengini burada özelleştirin
    }
    :hover fieldset: {
        border-color: red,
    }
    label.Mui-focused: {
        border-color: red,
    }
  }
  
`;

interface ContinentArr {
  name: string;
}

// GraphQL Continent name interface.
interface Continent {
  name: string;
  countries : ContinentArr[];
}

// GraphQL Language data interface.
interface Language {
  code: any;
  name: any;
  native: any;
}

// GraphQL Countries name interface.
interface Countries {
  name: string;
  code: string;
  capital: string;
  phone: string;
  native:string;
  continent : {
    name : string;
  }
  languages : Language[];
  currency : string;
}

// GraphQL Continent response data interface.
interface ResponseData {
  data: {
    continents: Continent[];
  };
}

// GraphQL Countries response data interface.
interface ResponseDataCountries {
  data: {
    countries: Countries[];
  };
}

// GraphQL Languages response data interface.
interface ResponseDataLanguages {
  data: {
    languages: Language[];
  };
}


// GraphQL Country data interface.
interface Country {
  name: any;
  native: any;
  capital: any;
  emoji: any;
  currency: any;
  languages: Language[];
}

// GraphQL Country code response data interface.
interface CountryCodeData {
  data: {
    country: Country;
  };
}

const Main = () => {
    
    // These states for managing GraphQL data.
    const[continentsData, setContinentsData] = useState<ResponseData | null>(null);
    const[countriesData, setCountriesData] = useState<ResponseDataCountries | null>(null);
    const[languagesData, setLanguagesData] = useState<ResponseDataLanguages | null>(null);
    const[countryCodeData, setCountryCodeData] = useState<CountryCodeData | null>(null);

    // These states for managing filter process.
    const[generalFilter,setGeneralFilter] = useState<string>("");
    const[generalFilterInput,setGeneralFilterInput] = useState<string>("");
    
    // These states for managing searching and sizing functions.
    const[search,setSearch] = useState<string>("");
    const[size,setSize] = useState<number | null>(null);
    const[sizeInput,setSizeInput] = useState<number | null>(null);

    // Selected state keeps selected item index number.
    const[selected,setSelected] = useState<number | null>(10);

    // Pagination field needs to length of the data. These states keeps data lengths, counts amount of page. 
    const[pages,setPages] = useState<number | null>(null);
    const[page,setPage]= useState<number>(0);

    // Selected item colors is different another items. When select other items this field provides colors which is declared.
    const [color,setColor] = useState<number>(0);

    // This field handling country code field.
    const [countryCodeInput,setCountryCodeInput] = useState<string>("TR");
    const handleCountryCodeInput = (e:any) => {
      setCountryCodeInput(e.target.value)
    }

    const [button1 , setButton1] = useState<boolean>(false);
    const [button2 , setButton2] = useState<boolean>(false);
    const [button3 , setButton3] = useState<boolean>(false);

    const [notification,setNotification] = useState<string|null>(null);

    // This useEffect hook is managing Countries Data page sizes.
    useEffect(() => {
      function filterData(x:any) {
        return x.name.includes(generalFilter);
      }
      if (countriesData) {
        try {
          setPages(countriesData.data.countries.filter(filterData).slice(0,size?size:countriesData.data.countries.length).length%10===0 ? (countriesData.data.countries.filter(filterData).slice(0,size?size:countriesData.data.countries.length).length-countriesData.data.countries.filter(filterData).slice(0,size?size:countriesData.data.countries.length).length%10)/10 : ((countriesData.data.countries.filter(filterData).slice(0,size?size:countriesData.data.countries.length).length-countriesData.data.countries.filter(filterData).slice(0,size?size:countriesData.data.countries.length).length%10)/10)+1)
          setPage(0)
          if (countriesData.data.countries.filter(filterData).length>=10){
            setSelected(10)
            setNotification(countriesData.data.countries.filter(filterData)[9].name+" "+"automatically selected.")
          } else {
            setSelected(countriesData.data.countries.filter(filterData).length)
            setNotification(countriesData.data.countries.filter(filterData)[countriesData.data.countries.filter(filterData).length-1].name+" "+"automatically selected.")

          }
        } catch {
          console.log("Error")
        }
      }
    }, [countriesData,generalFilter,size])

    // This useEffect hook is managing Continents Data page sizes.
    useEffect(() => {
      function filterData(x:any) {
        return x.name.includes(generalFilter);
      }
      if (continentsData) {
        setPages(continentsData.data.continents.filter(filterData).slice(0,size?size:continentsData.data.continents.length).length%10===0 ? (continentsData.data.continents.filter(filterData).slice(0,size?size:continentsData.data.continents.length).length-continentsData.data.continents.filter(filterData).slice(0,size?size:continentsData.data.continents.length).length%10)/10 : ((continentsData.data.continents.filter(filterData).slice(0,size?size:continentsData.data.continents.length).length-continentsData.data.continents.filter(filterData).slice(0,size?size:continentsData.data.continents.length).length%10)/10)+1)
        setPage(0)
        if (continentsData.data.continents.filter(filterData).length>=10){
          setSelected(10)
          setNotification(continentsData.data.continents.filter(filterData)[9].name+" "+"automatically selected.")

        } else {
          setSelected(continentsData.data.continents.filter(filterData).length)
          setNotification(continentsData.data.continents.filter(filterData)[continentsData.data.continents.filter(filterData).length-1].name+" "+"automatically selected.")

        }
      }
    }, [continentsData,generalFilter,size])

    // This useEffect hook is managing Languages Data page sizes.
    useEffect(() => {
      function filterData(x:any) {
        return x.name.includes(generalFilter);
      }
      if (languagesData) {
        setPages(languagesData.data.languages.filter(filterData).slice(0,size?size:languagesData.data.languages.length).length%10===0 ? (languagesData.data.languages.filter(filterData).slice(0,size?size:languagesData.data.languages.length).length-languagesData.data.languages.filter(filterData).slice(0,size?size:languagesData.data.languages.length).length%10)/10 : ((languagesData.data.languages.filter(filterData).slice(0,size?size:languagesData.data.languages.length).length-languagesData.data.languages.filter(filterData).slice(0,size?size:languagesData.data.languages.length).length%10)/10)+1)
        setPage(0)
        if (languagesData.data.languages.filter(filterData).length>=10){
          setSelected(10)
          setNotification(languagesData.data.languages.filter(filterData)[9].name+" "+"automatically selected.")

        } else {
          setSelected(languagesData.data.languages.filter(filterData).length)
          setNotification(languagesData.data.languages.filter(filterData)[languagesData.data.languages.filter(filterData).length-1].name+" "+"automatically selected.")

        }
      }
    }, [languagesData,generalFilter,size])

    // Handling pagination. decreasePage function decreases page number.
    const decreasePage = () => {
      if (pages){
        if (page!==0){
          setPage((prevVal) => prevVal-1)
        }
      }
    }

    // Handling pagination. increasePage function increases page number.
    const increasePage = () => {
      if (pages){
        if ((page+1)<pages){
          setPage((prevVal) => prevVal+1)
        }
      }

    }

    // Single page application needs to display different pages and application using some cases for display pages.
    const setDisplay = (item:string) => {
      switch (item) {
        case "continents":
          setCountriesData(null)
          setLanguagesData(null)
          setCountryCodeData(null)
          setCountryCodeInput("")
          clearFilter();
          handleClearSize();
          break;
        case "countries":
          setLanguagesData(null)
          setContinentsData(null)
          setCountryCodeData(null)
          setCountryCodeInput("")
          clearFilter();
          handleClearSize();
          break;
        case "languages":
          setContinentsData(null)
          setCountriesData(null)
          setCountryCodeData(null)
          setCountryCodeInput("")
          clearFilter();
          handleClearSize();
          break;
        case "country":
          setContinentsData(null)
          setCountriesData(null)
          setLanguagesData(null)
          clearFilter();
          handleClearSize();
          break;
      }
    }

    // Getting continent data from API
    const handleAPI = () => {
      setDisplay("continents")
      const query : string = `
        query ExampeQuery {
            continents {
              name
              countries {
                name
              }
            }
          
          }
        `;
      axios.post('https://countries.trevorblades.com/graphql', { query })
      .then(response => {
       const continentnames : ResponseData = response.data;
       setContinentsData(continentnames)
        if (continentnames.data.continents.length<10){
          setSelected(continentnames.data.continents.length)
        } else {
          setSelected(10)
        }
      })
      .catch(error => {
        console.error('GraphQL Query Error:', error);
      });
    }

    // Getting country data from API
    const handlecountriesAPI = () => {
      setDisplay("countries")
      const query : string = `
        query ExampeQuery {
            countries {
              name
              code
              capital
              phone
              native
              currency
              continent {
                name
              }
              languages {
                name
              }
            }
          
          }
        `;
      axios.post('https://countries.trevorblades.com/graphql', { query })
    .then(response => {
     const countrynames : ResponseDataCountries = response.data;
     setCountriesData(countrynames)
     if (countrynames.data.countries.length<10){
      setSelected(countrynames.data.countries.length)
    } else {
      setSelected(10)
    }
    })
    .catch(error => {
      console.error('GraphQL Query Error:', error);
    });
  }

  // Getting language data from API
  const handleLanguagesAPI = () => {
    setDisplay("languages")
    const query : string = `
      query ExampeQuery {
          languages {
            name
            code
            native
          }
        
        }
      `;
    axios.post('https://countries.trevorblades.com/graphql', { query })
    .then(response => {
      const languagesnames : ResponseDataLanguages = response.data;
      setLanguagesData(languagesnames)
      if (languagesnames.data.languages.length<10){
        setSelected(languagesnames.data.languages.length)
      } else {
        setSelected(10)
      }
    })
    .catch(error => {
      console.error('GraphQL Query Error:', error);
    });
  }

  // Getting country code data from API
  const handleCountryCodeAPI = (code:string) => {
    setDisplay("country");
    setCountryCodeInput("");
    setSelected(null);
    setNotification(null);
    const query : string = `
      query Query {
        country(code: "${code}") {
          name
          native
          capital
          emoji
          currency
          languages {
            code
            name
          }
        }
      }`;
    axios.post('https://countries.trevorblades.com/graphql', { query })
    .then(response => {
      const countrycodedata : CountryCodeData = response.data;
      countrycodedata.data.country!==null?setCountryCodeData(countrycodedata):console.log("hata")
    })
    .catch(error => {
      console.error('GraphQL Query Error:', error);
    });
  }

  const handleSelect = (item:number,name:string) => {
    item===selected?setSelected(null):setSelected(item)

    item===selected?setNotification(null):setNotification(`${name} selected`)
    
    if (color<colors.length-1){
      setColor((prevVal) => prevVal+1)
    } else if (color===colors.length-1) {
      setColor(0)
    }
  }

  function filterData(x:any) {
    return x.name.includes(generalFilter);
  }

  const handleGeneralFilter = (e:any) => {
    setGeneralFilterInput(e.target.value)
  }
  const addFilter = () => {
    setGeneralFilter(generalFilterInput);
  }

  const clearFilter = () => {
    setGeneralFilter("");
    setGeneralFilterInput("");
  }

  const handleSearch = (e:any) => {
    setSearch(e.target.value)
  }

  const getSearch = () => {
    try{
      if (search.split(" ")[0].split(":")[0]==="search"){
        setGeneralFilter(search.split(" ")[0].split(":")[1])
        
      }
      if (search.split(" ")[1].split(":")[0]==="group"){
        handleSize(parseInt(search.split(" ")[1].split(":")[1]));
      }
    } catch (error) {
      console.log("Error")
    }
    
  }

  const handleSizeSearchClear = () => {
    setSize(null);
    setSizeInput(null);
    setSearch("");
    setGeneralFilter("");
    setGeneralFilterInput("");
  }

  const handleSize = (x:any) => {
    setSize(x)
    
  }
  const handleClearSize = () => {
    setSize(null);
    setSizeInput(0);
  }
  const handleChangeSize = (e:any) => {
 
      setSizeInput(e.target.value)
    
  }



  

  const mapContinents = (item:any,index:number) => {
    return (
      <>
        {
          selected===(index+1)+page*10 ?
          <>
            <Tooltip  title={<h5 style={{ fontSize: "1.4rem",fontWeight:400 }}>Click for de-select</h5>} className='Tooltip'>
              <section key={index}  className='container-display-lineselected' onClick={() => handleSelect(((index+1)+page*10),(item.name))} style={{backgroundColor:`${colors[color].color}`}}>
                <p style={{marginRight:"1rem",fontWeight:700,color:"white"}}>{(index+1)+page*10}</p>
                <section className='container-display-lineselected-info'>
                  <h4>{item.name}</h4>
                  <section className='container-display-lineselected-info-contain'>
                  {
                      item.countries ?
                      <section className='container-display-lineselected-info-line'>
                        <h5>
                          Countries:
                        </h5>
                        {item.countries.map((x:any,index:any)=> item.countries.length===index+1 ? <p>{x.name}</p> : <p>{x.name}, </p>)}
                      </section>
                      : <></>
                    }

                    </section>
                </section>
              </section>
            </Tooltip>
          </>
          :
          <>
            <Tooltip  title={<h5 style={{ fontSize: "1.4rem",fontWeight:400 }}>Click for select</h5>} className='Tooltip'>
            <section key={index} className='container-display-line' onClick={() => handleSelect(((index+1)+page*10),(item.name))}>
                <p style={{marginRight:"1rem",color:"rgb(255,32,72)",fontWeight:700}}>{(index+1)+page*10}</p>
                <section className='container-display-line-info'>
                  <h4>{item.name}</h4>
                  <section className='container-display-line-info-contain'>
                  {
                      item.countries ?
                      <section className='container-display-line-info-line'>
                        <h5>
                          Countries:
                        </h5>
                        {item.countries.map((x:any,index:any)=> item.countries.length===index+1 ? <p>{x.name}</p> : <p>{x.name}, </p>)}
                      </section>
                      : <></>
                    }

                    </section>
                  </section>
                </section>

            </Tooltip>
          </>
        }
        </>
        
    )
  }

  const mapLanguages = (item:any,index:number) => {
    return (
      <>
        {
          selected===(index+1)+page*10 ?
          <>
            <Tooltip  title={<h5 style={{ fontSize: "1.4rem",fontWeight:400 }}>Click for de-select</h5>} className='Tooltip'>
              <section key={index}  className='container-display-lineselected' onClick={() => handleSelect(((index+1)+page*10),(item.name))} style={{backgroundColor:`${colors[color].color}`}}>
                <p style={{marginRight:"1rem",color:"white",fontWeight:700}}>{(index+1)+page*10}</p>
                <section className='container-display-lineselected-info'>
                  <h4>{item.name}</h4>
                  <section className='container-display-lineselected-info-contain'>
                    {
                      item.code ?
                      <section className='container-display-lineselected-info-line'>
                        <h5>
                          Country Code:
                        </h5>
                        <p>{item.code}</p>
                      </section>
                      : <></>
                    }
                    {
                      item.native ?
                      <section className='container-display-lineselected-info-line'>
                        <h5 style={{marginLeft:"1rem"}}>
                          Native :
                        </h5>
                        <p>{item.native}</p>
                      </section>
                      : <></>
                    }


                    </section>
                  </section>
                </section>
              </Tooltip>
          </>
          :
          <>
            <Tooltip  title={<h5 style={{ fontSize: "1.4rem",fontWeight:400 }}>Click for select</h5>} className='Tooltip'>
              <section key={index} className='container-display-line' onClick={() => handleSelect(((index+1)+page*10),(item.name))}>
                <p style={{marginRight:"1rem",color:"rgb(255,32,72)",fontWeight:700}}>{(index+1)+page*10}</p>
                <section className='container-display-line-info'>
                  <h4>{item.name}</h4>
                  <section className='container-display-line-info-contain'>
                  {
                      item.code ?
                      <section className='container-display-line-info-line'>
                        <h5>
                          Country Code:
                        </h5>
                        <p>{item.code}</p>
                      </section>
                      : <></>
                    }
                    {
                      item.native ?
                      <section className='container-display-line-info-line'>
                        <h5 style={{marginLeft:"1rem"}}>
                          Native :
                        </h5>
                        <p>{item.native}</p>
                      </section>
                      : <></>
                    }

                    </section>
                  </section>
                </section>
              </Tooltip>
          </>
        }
        </>
        
    )
  }

  const mapCountries = (item:any,index:number) => {
    return (
      <>
        {
          selected===(index+1)+page*10 ?
          <>
            <Tooltip  title={<h5 style={{ fontSize: "1.4rem",fontWeight:400 }}>Click for de-select</h5>} className='Tooltip'>
              <section key={index}  className='container-display-lineselected' onClick={() => handleSelect(((index+1)+page*10),(item.name))} style={{backgroundColor:`${colors[color].color}`}}>
                <p style={{marginRight:"1rem",color:"white",fontWeight:700}}>{(index+1)+page*10}</p>
                <section className='container-display-lineselected-info'>
                  <h4>{item.name}</h4>
                  <section className='container-display-lineselected-info-contain'>
                  {
                      item.code ?
                      <section className='container-display-lineselected-info-line'>
                        <h5>
                          Country Code:
                        </h5>
                        <p>{item.code}</p>
                      </section>
                      : <></>
                    }

                    {
                      item.capital ?
                      <section className='container-display-lineselected-info-line'>
                        <h5 style={{marginLeft:"1rem"}}>
                          Capital:
                        </h5>
                        <p>{item.capital}</p>
                      </section>
                      : <></>
                    }

                    {
                      item.continent.name ? 
                      <section className='container-display-lineselected-info-line'>
                        <h5 style={{marginLeft:"1rem"}}>
                          Continent:
                        </h5>
                        <p>{item.continent.name}</p>
                      </section>
                      : <></>
                    }

                    {
                      item.phone ? 
                      <section className='container-display-lineselected-info-line'>
                        <h5 style={{marginLeft:"1rem"}}>
                          Phone:
                        </h5>
                        <p>{item.phone}</p>
                      </section>
                      : <></>
                    }

                    {
                      item.native ?
                      <section className='container-display-lineselected-info-line'>
                        <h5 style={{marginLeft:"1rem"}}>
                          Native:
                        </h5>
                        <p>{item.native}</p>
                      </section>
                      : <></>
                    }

                    {
                      item.currency ? 
                      <section className='container-display-lineselected-info-line'>
                        <h5 style={{marginLeft:"1rem"}}>
                          Currency:
                        </h5>
                        <p>{item.currency}</p>
                      </section>
                      : <></>
                    }
                    

                    {
                      item.language ?
                        item.languages.length>1 ? 
                          <section className='container-display-lineselected-info-line'>
                            <h5 style={{marginLeft:"1rem"}}>
                              Language:
                            </h5>
                            <p>{item.languages.map((item:any)=> `${item.name} `)}</p>
                          </section>
                        : <></>
                      : <></>
                    }
                  </section>
                </section>
              </section>
            </Tooltip>
          </>
          :
          <>
            <Tooltip  title={<h5 style={{ fontSize: "1.4rem",fontWeight:400 }}>Click for select</h5>} className='Tooltip'>
              <section key={index} className='container-display-line' onClick={() => handleSelect(((index+1)+page*10),(item.name))}>
                <p style={{marginRight:"1rem",color:"rgb(255,32,72)",fontWeight:700}}>{(index+1)+page*10}</p>
                <section className='container-display-line-info'>
                  <h4>{item.name}</h4>
                  <section className='container-display-line-info-contain'>
                    {
                      item.code ?
                      <section className='container-display-line-info-line'>
                        <h5>
                          Country Code:
                        </h5>
                        <p>{item.code}</p>
                      </section>
                      : <></>
                    }

                    {
                      item.capital ?
                      <section className='container-display-line-info-line'>
                        <h5 style={{marginLeft:"1rem"}}>
                          Capital:
                        </h5>
                        <p>{item.capital}</p>
                      </section>
                      : <></>
                    }

                    {
                      item.continent.name ? 
                      <section className='container-display-line-info-line'>
                        <h5 style={{marginLeft:"1rem"}}>
                          Continent:
                        </h5>
                        <p>{item.continent.name}</p>
                      </section>
                      : <></>
                    }

                    {
                      item.phone ? 
                      <section className='container-display-line-info-line'>
                        <h5 style={{marginLeft:"1rem"}}>
                          Phone:
                        </h5>
                        <p>{item.phone}</p>
                      </section>
                      : <></>
                    }

                    {
                      item.native ?
                      <section className='container-display-line-info-line'>
                        <h5 style={{marginLeft:"1rem"}}>
                          Native:
                        </h5>
                        <p>{item.native}</p>
                      </section>
                      : <></>
                    }

                    {
                      item.currency ? 
                      <section className='container-display-line-info-line'>
                        <h5 style={{marginLeft:"1rem"}}>
                          Currency:
                        </h5>
                        <p>{item.currency}</p>
                      </section>
                      : <></>
                    }
                    

                    {
                      item.language ?
                        item.languages.length>1 ? 
                          <section className='container-display-line-info-line'>
                            <h5 style={{marginLeft:"1rem"}}>
                              Language:
                            </h5>
                            <p>{item.languages.map((item:any)=> `${item.name} `)}</p>
                          </section>
                        : <></>
                      : <></>
                    }



                  </section>

                </section>

              </section>
            </Tooltip>
          </>
        }
        </>
        
    )
  }

  const searchAndGroup = () => {
    return (
      <section className='container-inputs-line'>
        <CustomTextField value={search} onChange={handleSearch} className='container-inputs-line-input' label="search:tt group:size" variant="outlined"/>
        <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>Search</h5>}>
          <Button onClick={() => getSearch()}  className='container-inputs-line-button' variant="contained" ><Search fontSize='large'/></Button>
        </Tooltip>
        <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>{button3?"Cleaning Process":"Clean"}</h5>}>
          <Button onMouseDown={() => setButton3(true)} onMouseUp={() => setButton3(false)} onClick={() => handleSizeSearchClear()}  className='container-inputs-line-button' variant="contained" ><Delete fontSize='large' style={{transition:".5s"}}/></Button>
        </Tooltip>
      </section>
    )
  }

  const sizeComp = () => {
    return (
      <section className='container-inputs-line'>
        <CustomTextField type='number' value={sizeInput} onChange={handleChangeSize} className='container-inputs-line-input' label="Size" variant="outlined"/>
        <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>Size</h5>}>
          <Button onClick={() => handleSize(sizeInput)}  className='container-inputs-line-button' variant="contained" >Size</Button>
        </Tooltip>
        <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>{button2?"Cleaning Process":"Clean"}</h5>}>
          <Button onClick={() => handleClearSize()}  className='container-inputs-line-button' variant="contained" ><Delete fontSize='large' style={{transition:".5s"}}/></Button>
        </Tooltip>
      </section>
    )
  }

  const filterComp = () => {
    return (
      <section className='container-inputs-line'>
        <CustomTextField value={generalFilterInput} onChange={handleGeneralFilter} className='container-inputs-line-input' label="Filter" variant="outlined"/>
        <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>Filter</h5>}>
        <Button onClick={() => addFilter()} className='container-inputs-line-button' variant="contained" ><FilterAlt fontSize='large'/></Button>
        </Tooltip>
        <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>{button1?"Cleaning Process":"Clean"}</h5>}>
        <Button onMouseDown={() => setButton1(true)} onMouseUp={() => setButton1(false)} onClick={() => clearFilter()} className='container-inputs-line-button' variant="contained" ><Delete fontSize='large' style={{transition:".5s"}}/></Button>
        </Tooltip>
      </section>
    )
  }

  const filterMenu = () => <>{filterComp()}{sizeComp()}{searchAndGroup()}</>
    
  const paginationComp = () => {
    return (
      <>
      <section className='Pagination'>
        <section className='Pagination-Pages'>
          <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>Length of pages</h5>}>
            <p>{pages} pages</p>
          </Tooltip>
        </section>

        <section className='Pagination-Page'>
          <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>Previous Page</h5>}>
            <NavigateBefore className='Pagination-Button' onClick={() => decreasePage()}/>
          </Tooltip>
          <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>Current Page</h5>}>
            <p className='Pagination-Page-CurrentPage'>{page+1}</p>
          </Tooltip>
          <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>Next Page</h5>}>
            <NavigateNext className='Pagination-Button' onClick={() => increasePage()}/>
          </Tooltip>
        </section>
      </section>
      </>
    )
  }

  return (
    <div className='Main'>
        <div className='container'>
            <section className='container-title'>
              <h5>Single Page Application</h5>
            </section>
            
            <section className='container-menu'>
              <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>Continents</h5>}>
                <div className={continentsData?'MenuButtonActive':'MenuButton'}  onClick={() => handleAPI()}><Public style={{marginRight:".5rem"}}/>continents</div>
              </Tooltip>
              <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>Countries</h5>}>
                <div className={countriesData?'MenuButtonActive':'MenuButton'} onClick={() => handlecountriesAPI()}><Public style={{marginRight:".5rem"}}/>countries</div>
              </Tooltip>
              <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>Languages</h5>}>
                <div className={languagesData?'MenuButtonActive':'MenuButton'} onClick={() => handleLanguagesAPI()}><Translate style={{marginRight:".5rem"}}/>languages</div>
              </Tooltip>
            </section>

            <section className='container-inputs'>
              <section className='container-inputs-line'>
                <CustomTextField value={countryCodeInput} onChange={handleCountryCodeInput} className='container-inputs-line-input' label="Country Code" variant="outlined"/>
                <Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>Search</h5>}>
                <Button onClick={() => handleCountryCodeAPI(countryCodeInput)} className='container-inputs-line-button' variant="contained" ><Search fontSize='large'/></Button>
                </Tooltip>
              </section>
            </section>

            <section className='container-filter'>
              {continentsData?<>{filterMenu()}</>:<></>}
              {countriesData?<>{filterMenu()}</>:<></>}
              {languagesData?<>{filterMenu()}</>:<></>}
            </section>

            <section className='container-display'>
              {continentsData? continentsData.data.continents.filter(filterData).slice(0,size?size:continentsData.data.continents.length).slice(page*10,(page*10)+10).map(mapContinents) : <></>}
              {continentsData?<>{paginationComp()}</>:<></>}

              {countriesData? countriesData.data.countries.filter(filterData).slice(0,size?size:countriesData.data.countries.length).slice(page*10,(page*10)+10).map(mapCountries) : <></>}
              {countriesData?<>{paginationComp()}</>:<></>}


              {languagesData? languagesData.data.languages.filter(filterData).slice(0,size?size:languagesData.data.languages.length).slice(page*10,(page*10)+10).map(mapLanguages) : <></>}
              {languagesData?<>{paginationComp()}</>:<></>}

              {countryCodeData?
              <>
                <section className='container-display-country'>
                  <h3 className='container-display-country-title'>{countryCodeData.data.country.name}</h3>
                  <table>
                    <tr>
                      <th><Flag style={{marginRight:".5rem"}}/>Capital</th>
                      <th><Paid style={{marginRight:".5rem"}}/>Currency</th>
                      <th><EmojiEmotions style={{marginRight:".5rem"}}/>Emoji</th>
                      <th><Place style={{marginRight:".5rem"}}/>Native</th>
                      <th><Code style={{marginRight:".5rem"}}/>Language Code</th>
                      <th><LanguageIcon style={{marginRight:".5rem"}}/>Language Name</th>
                    </tr>
                    <tr>
                      <td>{countryCodeData.data.country.capital}</td>
                      <td>{countryCodeData.data.country.currency}</td>
                      <td>{countryCodeData.data.country.emoji}</td>
                      <td>{countryCodeData.data.country.native}</td>
                      <td>{countryCodeData.data.country.languages[0].code}</td>
                      <td>{countryCodeData.data.country.languages[0].name}</td>
                    </tr>
                  </table>
                </section>
              </>:<></>}
            </section>
            {notification?
            <section className='Notification'>
              {
                
                 notification ? <section className='Notification-Item'>{notification}<Tooltip title={<h5 style={{ fontSize: "1.3rem",fontWeight:400 }}>De-select</h5>}><Cancel style={{fontSize:"2rem",marginLeft:"1rem",cursor:"pointer"}} onClick={() => {setSelected(null); setNotification(null)}}/></Tooltip></section> : <></>
                 
              }
            </section>
              :<></>}
        </div>
    </div>
  )
}

export default Main