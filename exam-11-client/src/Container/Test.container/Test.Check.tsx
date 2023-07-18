import axios from 'axios'
import { nanoid } from 'nanoid'
import React, { ChangeEvent, FormEvent, useState } from 'react'

interface ITest {
    id: string
    picture: File | string
}



const TestCheck = () => {

    const [value ,setValue] = useState<ITest[]> ([])

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {

        if(e.target.files){
            const file = e.target.files[0]


            setValue([...value , {id : nanoid() , picture: file}])

            
        }

    }

    const submitHandler = async(e:FormEvent <HTMLFormElement>) => {

        e.preventDefault()

        const formData: FormData = new FormData()

        const copy: ITest[] = [...value]

        copy.map((val , index) => {

            if(typeof val.picture !== 'string' ) {

                const  file_name = "SSSSSSSSSSS" + nanoid() + val.picture.name;

                const  new_file = new File([val.picture], file_name, {type: val.picture.type});

                const dt = new DataTransfer()                
                
                dt.items.add(new_file);

                val.picture = dt.files[0].name

                formData.append(`picture` , dt.files[0])

                console.log(val);

                return val
                    
                             
            }

            



            console.log('dd');
            
            return

        })

        
 
        const response = await axios.post('http://localhost:8000' , copy[0] )

        const responseDouble = await axios.post('http://localhost:8000/form' , formData)

        
    }





    return (
        <>
            <div>
                <form onSubmit={submitHandler}>

                    <input
                        type='file'
                        onChange={(e) => changeValue(e)}
                    />

                    <button
                        type='submit'                    
                    >
                        click
                    </button>
                </form>
                
                
            </div>
            {
                value.map((val) => {
                    <img 
                        width='200px'
                        key={val.id}
                        src={URL.createObjectURL(new Blob([val.picture] , {type: 'image/jpeg'}))} />
                })
            }
            <img 
                src='http://localhost:8000/uploads/tutorial/SSSSSSSSSSSJG3uyDruegJKv2aInGOd58bd7bb7b-11c0-4c53-a851-08755cf31144 2.JPG'
            />
        </>
    )
}

export default TestCheck