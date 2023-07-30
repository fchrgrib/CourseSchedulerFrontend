import React, {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

export default function Course() {

    const[major,setMajor] = useState([])
    const[majorData,setMajorData] = useState([])
    const[semester,setSemester] = useState(0)
    const[minimumCredits,setMinimumCredits] = useState(0)
    const[maximumCredits, setMaximumCredits] = useState(0)
    const[choose, setChoose] = useState('no')
    const[coursesSelected,setCoursesSelected] = useState([])
    const[postButton,setPostButton] = useState(true)

    const navigate = useNavigate()

    const arrChoose = ['no','yes']

    const urlPostCourseReq = 'http://localhost:8080/course_select'

    const urlDataMajor = "http://localhost:8080/major"

    const fetchDataMajor = async ()=>{
        try {
            const response = await axios.get(urlDataMajor)
            if (response.status<400){
                setMajorData(response.data.major)
                setMajor(response.data.major[0].major_name)
            }
        }catch (e){
            if (e instanceof AxiosError) {
                const errorMsg = e.response?.data?.error;
                console.log(errorMsg)
            }
        }
    }


    const postCourseRequest = async () =>{
        console.log(postButton,major,semester,minimumCredits,maximumCredits)
        if (
            postButton&&
            major!==''&&
            semester!==0&&
            minimumCredits!==0&&
            maximumCredits!==0
        ){
            setPostButton(false)
            try {
                const response = await axios.post(urlPostCourseReq,{
                    major:major,
                    semester:parseInt(semester),
                    minimum_credits:parseInt(minimumCredits),
                    maximum_credits:parseInt(maximumCredits),
                    choose:choose
                })
                if (response.status<400){
                    setCoursesSelected(response.data)
                }
                setPostButton(true)
            }catch (e) {
                console.log(e)
                setPostButton(true)
            }
        }
    }

    useEffect(()=>{
        fetchDataMajor()
    },[])

    return(
        <div className="w-full h-auto flex justify-center mt-10">
            <div className="w-[20rem] h-auto flex-col border border-b-neutral-700 rounded-lg p-4">
                <div className="w-full h-auto flex-col">
                    <label className="text-gray-600 font-semibold">Major Name</label>
                    <select value={major} onChange={e=>{setMajor(e.target.value)}} className="border border-gray-200 p-1 w-full rounded-lg">
                        {
                            majorData&&majorData.map((item)=>(
                                <option key={item.major_name} value={item.major_name}>{item.major_name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="w-full h-auto flex-col">
                    <label className="text-gray-600 font-semibold">Semester</label>
                    <input type="number" name="semester" placeholder="Semester" className="p-2 border border-gray-300 rounded-lg w-full" onChange={e =>setSemester(e.target.value)} value={semester}/>
                </div>
                <div className="w-full h-auto flex-col">
                    <label className="text-gray-600 font-semibold">Minimum Credits</label>
                    <input type="number" name="minimum credits" placeholder="Minimum Credits" className="p-2 border border-gray-300 rounded-lg w-full" onChange={e =>setMinimumCredits(e.target.value)} value={minimumCredits}/>
                </div>
                <div className="w-full h-auto flex-col">
                    <label className="text-gray-600 font-semibold">Maximum Credits</label>
                    <input type="number" name="maximum credits" placeholder="Maximum Credits" className="p-2 border border-gray-300 rounded-lg w-full" onChange={e =>setMaximumCredits(e.target.value)} value={maximumCredits}/>
                </div>
                <div className="w-full h-auto flex mt-3">
                    <label className="text-gray-600 font-semibold w-1/2">Do you want with Department?</label>
                    <select value={choose} onChange={e=>{setChoose(e.target.value)}} className="border border-gray-200 p-1 w-1/2 rounded-lg">
                        {
                            arrChoose&&arrChoose.map((item)=>(
                                <option key={item} value={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>
                <button className="px-4 py-2 bg-fuchsia-400 rounded-lg text-white font-semibold w-full mt-3" onClick={postCourseRequest}>
                    POST
                </button>
                <div className="w-full h-auto flex mt-6">
                    <label className="text-gray-600 font-semibold w-1/2">Add more data</label>
                    <button className="px-4 py-2 bg-pink-400 rounded-lg text-white font-semibold w-1/2 mt-3" onClick={()=>{navigate("/info")}}>
                        CLICK
                    </button>
                </div>
            </div>
            {
                coursesSelected&&
                <div className="w-[60rem] h-auto ml-10 mr-10">
                    <div className="w-full h-auto flex-col">
                        <div className="w-[70rem] justify-between flex text-gray-600 font-semibold">
                            <ul className="w-[10rem]">Course Id</ul>
                            <ul className="w-[10rem]">Name</ul>
                            <ul className="w-[10rem]">Credits</ul>
                            <ul className="w-[10rem]">Semester</ul>
                            <ul className="w-[10rem]">Major</ul>
                            <ul className="w-[10rem]">Index</ul>
                            <ul className="w-[10rem]">Department</ul>
                        </div>
                        {
                            coursesSelected.course&&coursesSelected.course.map((item)=>{
                                return(
                                    <div className="w-[70rem] justify-between flex text-gray-600 font-normal">
                                        <ul className="w-[10rem]">{item.id}</ul>
                                        <ul className="w-[10rem]">{item.name}</ul>
                                        <ul className="w-[10rem]">{item.credit_total}</ul>
                                        <ul className="w-[10rem]">{item.semester}</ul>
                                        <ul className="w-[10rem]">{item.major_name}</ul>
                                        <ul className="w-[10rem]">{item.expectation}</ul>
                                        <ul className="w-[10rem]">{item.department_id}</ul>
                                    </div>
                                )
                            })
                        }
                        <div className="text-gray-600 font-semibold mt-9">
                            GPA     : {coursesSelected.score}
                        </div>
                        <div className="text-gray-600 font-semibold">
                            Credits : {coursesSelected.credits_total}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}