import React ,{useState , useEffect} from 'react';
import {Button , Form , Grid ,Loader} from "semantic-ui-react";
import {storage , db} from "../firebase";
import {useParams , useNavigate} from "react-router-dom";
import { getDownloadURL } from 'firebase/storage';
import { ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, serverTimestamp , getDoc } from 'firebase/firestore';

const initialState={
    Name : "",
    Quantity : "",
    Price : "",
    Description : ""
}

const AddEditItems = () => {
  const[data,setData] = useState(initialState);
  const{Name , Quantity , Price , Description} = data;
  const[file,setFile] = useState(null);
  const[progress , setProgress] = useState(null);
  const[errors,setErrors] = useState({});
  const[isSubmit , setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const{id} = useParams();
  useEffect(() => {
    id && getSingleItem();
  },[id]);

  const getSingleItem = async() => {
    const docRef = doc(db , "items" , id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
        setData({...snapshot.data()});
    }
  }

  useEffect( () => {
    const uploadFile = () =>{
        const name = new Date().getTime() + file.Name;
        const storageRef = ref(storage, `images/${new Date().getTime()}_${file.Name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress (progress);
            switch (snapshot.state) {
                case "paused":
                console.log("Upload is Pause");
                break;
                case "running":
                console.log("Upload is Running");
                break;
                default:
                break;
            }
        } ,(error)=>{
            console.log(error)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                setData((prev) => ({...prev , img: downloadURL}))
            })
        }
    );

    }
    file && uploadFile()
  },[file])



  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value});
  };


  const validate = () => {
    let errors = {} ;
    if(!Name){
        errors.Name = "Name is required";
    }
    if(!Quantity){
        errors.Quantity = "Quantity is required";
    }
    if(!Price){
        errors.Price = "Price is required";
    }
    if(!Description){
        errors.Description = "Description is required";
    }
    return errors;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    let errors = validate();
    if(Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    await addDoc(collection(db , "items") ,{
        ...data,
        timestamp:serverTimestamp()
    })
    navigate("/");
  };

    return (
    <div>
        <Grid 
        centered
        verticalAlign='middle'
        columns="3"
        style = {{height : "80vh"}} 
        >
            <Grid.Row>
                <Grid.Column textAlign='center'>
                    <div>
                        {isSubmit ? (
                            <Loader active inline="centered" size='huge' />
                        ) : (
                            <>
                            <h2>Add Item</h2>
                            <Form onSubmit={handleSubmit}>
                            <Form.Input
                                label = "Name"
                                error = {errors.Name ? {content:errors.Name} : null}
                                placeHolder = "Enter Product Name"
                                name = "Name"
                                onChange={handleChange}
                                value={Name}
                                autoFocus
                            />
                            <Form.Input
                                label = "Quantity"
                                error = {errors.Quantity ? {content:errors.Quantity} : null}
                                placeHolder = "Enter Quantity"
                                name = "Quantity"
                                onChange={handleChange}
                                value={Quantity}
                            />
                            <Form.Input
                                label = "Price"
                                error = {errors.Price ? {content:errors.Price} : null}
                                placeHolder = "Enter Price"
                                name = "Price"
                                onChange={handleChange}
                                value={Price}
                            />
                            <Form.TextArea
                                label = "Description"
                                error = {errors.Description ? {content:errors.Description} : null}
                                placeHolder = "Enter Product Description"
                                name = "Description"
                                onChange={handleChange}
                                value={Description}
                            />
                            <Form.Input 
                                label = "Upload"
                                type = "file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <Button primary type='submit' disabled = {progress != null && progress < 100}>
                                Submit
                            </Button>
                            </Form>
                            </>
                        )}
                    </div>
                </Grid.Column>
            </Grid.Row>   
        </Grid>
    </div>
  )
}

export default AddEditItems