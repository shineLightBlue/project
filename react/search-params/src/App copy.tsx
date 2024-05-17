import React from 'react';
import { useSearchParams } from 'react-router-dom';

function MyComponent() {
  // 获取当前 URL 查询参数对象和更新查询参数的方法
  const [searchParams, setSearchParams] = useSearchParams();

  // 从查询参数对象中获取特定参数的值
  const name = searchParams.get('name');
  const age = searchParams.get('age')
  const gender = searchParams.get('gender')
  console.log(name)
  console.log(age)
  console.log(gender)
  // 更新查询参数
  const updateParameters = () => {
    // 设置多个查询参数
    searchParams.set('name', 'John');
    searchParams.set('age', '31');
    searchParams.set('gender', 'male');

    // 更新查询参数对象
    setSearchParams(searchParams);
  };

  return (
    <div>
      <p>Name: {name}</p>
      <button onClick={updateParameters}>Update Age</button>
    </div>
  );
}

export default MyComponent;
