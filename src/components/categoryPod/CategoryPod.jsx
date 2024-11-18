import React from 'react';
import "./CategoryPod.css";

const CategoryPod = (props) => {
    const {
        category_color,
        category_image,
        category_name,
    } = props;

    return (
        <div className='category-pod-container'>
            <div 
                className='category-pod-image-container' 
                style={{ backgroundColor: category_color }}
            >
                <img className='category-pod-image' src={category_image} alt={category_name} />
            </div>
            <div className='category-pod-text-container'>
                <h5 className='category-pod-text'>{category_name}</h5>
            </div>
        </div>
    );
}

export default CategoryPod;
