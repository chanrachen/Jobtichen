import { Button } from "flowbite-react";
import { useState } from "react";
export default function ButtonComponent({title}) {
    //let count = 0;
    const [count , setCount] = useState(0);

    //arrow function
    const handleCount = () => {
        setCount(count+1) // count++'
        console.log(count)
    }
  return (
    <>
    <div>
    <Button gradientMonochrome="success" size="xl" onClick={handleCount}>{count}</Button>
    </div>
    </>
  )
}
