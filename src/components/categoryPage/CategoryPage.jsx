import React, { useEffect, useState } from 'react';
import './CategoryPage.css';
import NavigationHeader from '../navigationHeader/NavigationHeader';
import backButtonicon from '../../image/BackIcon.svg';
import CategoryPod from '../categoryPod/CategoryPod';
import NavigationSearch from '../navigationSearch/NavigationSearch';
import { useNavigate } from 'react-router-dom';
import LoadingCircle from '../loadinCircule/LoadingCircle';
import { useAppContext } from '../../appState/appStateContext';

const CategoryPage = () => {
  const { globalState, dispatch } = useAppContext();
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const clickHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    setCategoryList(globalState?.categories || []);
  }, [globalState?.categories]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/categories`, {
          credentials: "include",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: "SET_CATEGORIES_LIST", payload: data });
        setCategoryList(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [dispatch]);

  return (
    <div className='categorys-page-container'>
      <div className='categorys-page-headers'>
        <NavigationHeader
          title="Categories"
          titleClassName="navigation-header-categorys"
          NavigationHeaderImage={backButtonicon}
          NavigationHeaderImageClassName="back-button-image-icon"
          onClick={clickHandler}
        />
        <NavigationSearch setCategoryList={setCategoryList} />
      </div>

      <div className='categorys-cart-container'>
        {isLoading ? (
          <LoadingCircle />
        ) : (
          categoryList.map((category) => (
            <CategoryPod
              key={category._id}
              category_color={category.category_color}
              category_image={category.category_image}
              category_name={category.category_name}
              _id={category._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
