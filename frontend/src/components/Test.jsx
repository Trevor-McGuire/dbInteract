import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This code runs after every render
    console.log('Effect ran!');

    // If you return a function from the effect, it will run when the component is unmounted
    return () => {
      console.log('Cleanup!');
    };
  }, [count]); // Run the effect only if 'count' changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default MyComponent;
