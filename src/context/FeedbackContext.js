import { v4 as uuidv4 } from 'uuid'
import {createContext,useState, useEffect} from 'react'

const FeedbackContext=createContext();

export const FeedbackProvider=({children})=>{
    const [feedback,setFeedback]=useState([]);

    const [feedbackEdit,setFeedbackEdit]=useState({
        item:{},
        edit: false,
    });

    useEffect(()=>{
        fetchFeedback()
    },[])
    
//Fetch feedback
const fetchFeedback=async()=>{
    const response=await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
    const data=await response.json()

    setFeedback(data)
}

//Add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback])
      }

//Delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
          setFeedback(feedback.filter((item) => item.id !== id))
        }
      }

//Update feedback item
const updateFeedback=(id,upItem)=>{
    setFeedback(feedback.map((item)=>item.id===id?{item, ...upItem}:item))
}

//Set item to be updated
    const editFeedback=(item)=>{
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    
return <FeedbackContext.Provider value={{
    feedback,
    deleteFeedback,
    addFeedback,
    editFeedback,
    feedbackEdit,
    updateFeedback
}}>
    {children}
</FeedbackContext.Provider>
}

export default FeedbackContext