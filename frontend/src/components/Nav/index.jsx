import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Menu,  Switch, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.css';



const Nav = () => {

    const [theme, setTheme] = useState(null);
    const [searchCocktail, setSearchCocktail] = useState("");
    const [searchIngredient, setSearchIngredient] = useState("");
    const { SubMenu } = Menu;
    
    const dark = (value) => {

               setTheme(value  ? 'dark' : 'light');    
               const menu = document.getElementsByClassName('ant-menu')[0];

               const body = document.body;
               body.classList.toggle('dark');
       };

        let inputValue_cocktail;
        let inputValue_ingredient;

        const handleChange_cocktail = (e) => {
          
          const value = e.target.value;
          inputValue_cocktail = value;
          setSearchCocktail(value);
                   // name_input : input_value
              
       }
       const handleChange_ingredient = (e) => {
          
          const value = e.target.value;
          inputValue_ingredient = value;
          setSearchIngredient(value);
                   // name_input : input_value
              
       }
   
        const handleSubmit_cocktail = (e) => {
          
           window.location.replace(`cocktail/${searchCocktail}`);
        }
        const handleSubmit_ingredient = (e) => {
         
           window.location.replace(`cocktails_by_ingredient/${searchIngredient}`);
        }
       /** <SubMenu
                             title={
                        
                                <Switch
                                 onChange={dark}
                                 checkedChildren="Dark"
                                 unCheckedChildren="Light"
                               /> 
                        
                          }
                        >  
                        </SubMenu> */
    return (
        <div className="nav">  
      
                 <Menu mode="horizontal" className="menu" theme={theme}>
                      

                      <Menu.Item key="home">
                          <Link to="/home"> Accueil </Link>
                        </Menu.Item>

                        <Menu.Item key="cocktailA">
                         <Link to='/cocktails_alcoholic'> Cocktail</Link >
                        </Menu.Item>
 
                        <Menu.Item key="cocktailNA">
                         <Link to='/cocktails_non_alcoholic'> Cocktail Non alcoholic</Link >
                        </Menu.Item>
  
                 </Menu>
                        <div className="search">
                          
                           <div className="search_info">
                               <label htmlFor="cocktail_name"> Cocktail name : </label><Input className="input_search"  name="cocktail"  placeholder="cocktail name" onChange={handleChange_cocktail} value={inputValue_cocktail}  ></Input> 
                               <Button    icon={<SearchOutlined />} htmlType="submit" onClick={handleSubmit_cocktail} >search</Button>
                           </div>

                           <div className="search_info">
                               <label htmlFor="cocktail_ingredient"> Already have an ingredient ? </label><Input className="input_search"  name="name"  placeholder="ingredient" onChange={handleChange_ingredient} value={inputValue_ingredient}  ></Input> 
                               <Button  icon={<SearchOutlined />} htmlType="submit" onClick={handleSubmit_ingredient} >search</Button>
                           </div>

                     </div>
                
                  
        </div>
    )
}

export default Nav;