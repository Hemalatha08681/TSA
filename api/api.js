import axios from 'axios'

const BaseURI= 'https://tsa-nie-next.vercel.app'

const getTrainings = ()=> axios.get(`${BaseURI}/api/trainings`)
const getTrainingById = (id)=> axios.get(`${BaseURI}/api/trainings/${id}`)
const getTrainingApplicants = (id)=> axios.get(`${BaseURI}/api/trainings/${id}/applicants`)
const applyToTraining = (id,applicantData)=> axios.post(`${BaseURI}/api/trainings/${id}/apply`,applicantData)
const createTraining = (trainingData)=> axios.post(`${BaseURI}/api/trainings`,trainingData)
export {getTrainings,getTrainingById,getTrainingApplicants,applyToTraining,createTraining}