import { useEffect, useState } from "react";
import RecipeCard from "./components/RecipeCard";
import "./App.css";

function App() {
const [query, setQuery] = useState("")
const [recipes, setRecipes] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState()

  const fetchData =async(e)=>{
    e.preventDefault()
    setIsLoading(true)
    try {

      const res = await fetch(`https://api.edamam.com/api/recipes/v2?app_id=61c11269&app_key=cf43b3e314aa891ac1ee412ad8e555e6&type=any&q=${query}`);
        
      const data = await res.json()
      console.log(data.hits)
      if(data.hits.length>0){
        setRecipes(data.hits);
        setIsLoading(false)
        setError("")
      }else{
        setRecipes([])
        setError("Nothing found")
        setIsLoading(false)

      }
     
      
    } catch (error) {
      console.log(error)
      
    }
    
    
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return (
    <div className="container">
      <h2 className="contain">Food Recipe Store</h2>
      {error != ""? <p style={{color:"red"}}>{error}</p> : "" }
      <form autoComplete="off"onSubmit={fetchData}>
        <input
          className="form-control"
          placeholder="Search Recipe"
          name="query"
          value= {query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <input type="submit" className="btn" value="Search" />
      </form>

      <div className="recipes">
        
        { isLoading ? "Loading...": recipes.map((data)=>{
          const {recipe} = data
          return <RecipeCard foodName={recipe.label} foodCategory={recipe.dishType[0]} foodImage={recipe.image} intructions={recipe.url}/>
        })}
      </div>

      

        </div> );
}

export default App;
