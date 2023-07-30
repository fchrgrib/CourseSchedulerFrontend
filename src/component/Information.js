import React, {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ChangeEvent} from "react";

export default function Information(){

    // Department Variable
    const [departmentData, setDepartmentData] = useState([])
    const [idDepartment, setIdDepartment] = useState()
    const [department, setDepartment] = useState()
    const [departments, setDepartments] = useState([])
    const [addDepartmentButton, setAddDepartmentButton] = useState(true)

    const urlDataDepartment = "http://localhost:8080/department"
    const urlPostDataDepartment = "http://localhost:8080/add_department"
    const urlPostDataDepartments = "http://localhost:8080/add_departments"

    const postDataDepartment = async ()=>{
        if (idDepartment!==''&&department!==''&&addDepartmentButton){
            setAddDepartmentButton(false)
            try {
                const response = await axios.post(urlPostDataDepartment,{
                    id:idDepartment,
                    department_name:department,
                })
                if(response.status<400){
                    toast.success(`${department} berhasil ditambahkan`)
                    setIdDepartment('')
                    setDepartment('')
                    fetchDataDepartment()
                }else{
                    toast.error(`${department} gagal ditambahkan`)
                }
                setAddDepartmentButton(true)
            }catch (e) {
                toast.error(`${department} gagal ditambahkan`)
                console.log(e)
                setAddDepartmentButton(true)
            }
        }
    }

    const postDepartments = async () =>{
        if(departments&&addDepartmentButton){
            setAddDepartmentButton(false)
            try {
                const response = await axios.post(urlPostDataDepartments,departments,{
                    headers: {
                        'Content-Type': 'application/json',
                    }})
                if(response.status<400){
                    toast.success(`file json berhasil ditambahkan`)
                    fetchDataDepartment()
                }else{
                    toast.error(`file json gagal ditambahkan`)
                }
                setAddDepartmentButton(true)
            }catch (e) {
                toast.error(`file json gagal ditambahkan`)
                setAddDepartmentButton(true)
                console.log(e)
            }
        }
    }
    const handleFileDepartmentChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = (event) => {
                const fileContent = event.target?.result.toString()
                try {
                    const jsonData = JSON.parse(fileContent);
                    setDepartments(jsonData)
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }// Do something with the JSON data
            };

            reader.readAsText(file);
        }
    };

    const fetchDataDepartment = async () =>{
        try{
            const r = await axios.get(urlDataDepartment)
            if(r.status<400) {
                setDepartmentData(r.data.department)
                setIdDepartmentMajor(r.data.department[0].id)
            }
            console.log(r.data)
        }catch (e){
            if (e instanceof AxiosError) {
                const errorMsg = e.response?.data?.error;
                console.log(errorMsg)
            }
        }
    }

    // Major variable
    const [majorData, setMajorData] = useState([])
    const [idDepartmentMajor, setIdDepartmentMajor] = useState('')
    const [idMajor, setIdMajor] = useState('')
    const [major, setMajor] = useState('')
    const [majors, setMajors] = useState([])

    const [addMajorButton, setAddMajorButton] = useState(true)
    const urlDataMajor = "http://localhost:8080/major"
    const urlPostDataMajor = "http://localhost:8080/add_major"
    const urlPostDataMajors = "http://localhost:8080/add_majors"

    const fetchDataMajor = async ()=>{
        try {
            const response = await axios.get(urlDataMajor)
            if (response.status<400){
                setMajorData(response.data.major)
                setMajorCourse(response.data.major[0].major_name)
            }
        }catch (e){
            if (e instanceof AxiosError) {
                const errorMsg = e.response?.data?.error;
                console.log(errorMsg)
            }
        }
    }

    const postMajor = async () =>{
        if (idMajor!==''&&major!==''&&addMajorButton&&idDepartmentMajor!==''){
            setAddMajorButton(false)
            console.log(idMajor)
            console.log(major)
            console.log(idDepartmentMajor)
            try {
                const response = await axios.post(urlPostDataMajor,{
                    id:idMajor,
                    major_name:major,
                    department_id:idDepartmentMajor,
                })
                if (response.status<400){
                    toast.success(`${major} berhasil ditambahkan`)
                    fetchDataMajor()
                }else {
                    toast.error(`${major} gagal ditambahkan`)
                }
                setAddMajorButton(true)
                setMajor('')
                setIdMajor('')
            }catch (e) {
                console.log(e)
                toast.error(`${major} gagal ditambahkan`)
                setAddMajorButton(true)
                setMajor('')
                setIdMajor('')
            }
        }
    }

    const postMajors = async () =>{
        if(majors&&addMajorButton){
            setAddMajorButton(false)
            try {
                const response = await axios.post(urlPostDataMajors,majors,{
                    headers: {
                        'Content-Type': 'application/json',
                    }})
                if(response.status<400){
                    toast.success(`file json berhasil ditambahkan`)
                    fetchDataMajor()
                }else{
                    toast.error(`file json gagal ditambahkan`)
                }
                setAddMajorButton(true)
            }catch (e) {
                toast.error(`file json gagal ditambahkan`)
                setAddMajorButton(true)
                console.log(e)
            }
        }
    }


    const handleFileMajorChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = (event) => {
                const fileContent = event.target?.result.toString()
                try {
                    const jsonData = JSON.parse(fileContent);
                    setMajors(jsonData)
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }// Do something with the JSON data
            };

            reader.readAsText(file);
        }
    }

    const handleSelectMajor = (event)=>{
        setIdDepartmentMajor(event.target.value)
    }


    const arrSKS = [1,2,3,4,5,6,7,8,9]
    const arrExpectation = ['A','AB','B','BC','D','E']

    const [courseData, setCourseData] = useState([])
    const [idCourse, setIdCourse] = useState()
    const [course, setCourse] = useState()
    const [majorCourse, setMajorCourse] = useState()
    const [semester, setSemester] = useState(0)
    const [credits, setCredits] = useState(arrSKS[0])
    const [expectation, setExpectation] = useState(arrExpectation[0])
    const [courses, setCourses] = useState([])
    const [addCourseButton, setAddCourseButton] = useState(true)

    const urlDataCourse = 'http://localhost:8080/course'
    const urlPostDataCourse = 'http://localhost:8080/add_course'
    const urlPostDataCourses = 'http://localhost:8080/add_courses'

    const fetchDataCourse = async () =>{
        try{
            const response = await axios.get(urlDataCourse)
            if(response.status<400) {
                setCourseData(response.data.course)
            }
        }catch (e) {
            if (e instanceof AxiosError) {
                const errorMsg = e.response?.data?.error;
                console.log(errorMsg)
            }
        }
    }

    const postCourse = async ()=>{
        if (
            idCourse !== ''&&
            course !== ''&&
            semester !== 0&&
            credits !== 0&&
            expectation !== ''&&
            majorCourse !== ''&&
            addCourseButton
        ){
            setAddCourseButton(false)
            console.log(idCourse,course,semester,credits,expectation,majorCourse)
            try{
                const response = await axios.post(urlPostDataCourse,{
                    id:idCourse,
                    name:course,
                    semester:parseInt(semester),
                    credit_total:parseInt(credits),
                    expectation:expectation,
                    major_name:majorCourse,
                })

                if (response.status<400){
                    toast.success(`${course} berhasil ditambahkan`)
                    setIdCourse('')
                    setCourse('')
                    fetchDataCourse()
                }else{
                    toast.error(`${course} gagal ditambahkan`)
                }
                setAddCourseButton(true)
            }catch (e) {
                toast.error(`${course} gagal ditambahkan`)
                console.log(e)
                setAddCourseButton(true)
            }
        }
    }

    const postCourses = async ()=>{
        if (courses&&addCourseButton){
            setAddCourseButton(false)
            try{
                const response = await axios.post(urlPostDataCourses,courses,{
                    headers: {
                        'Content-Type': 'application/json',
                    }})
                if (response.status<400){
                    toast.success('file json berhasil ditambahkan')
                    fetchDataCourse()
                }else{
                    toast.error('file json gagal ditambahkan')
                }
                setAddCourseButton(true)
            }catch (e){
                toast.error('file json gagal ditambahkan')
                console.log(e)
                setAddCourseButton(true)
            }
        }
    }

    const handleFileCourseChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = (event) => {
                const fileContent = event.target?.result.toString()
                try {
                    const jsonData = JSON.parse(fileContent);
                    setCourses(jsonData)
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }// Do something with the JSON data
            };

            reader.readAsText(file);
        }
    }



    useEffect(()=>{
        fetchDataDepartment()
        fetchDataMajor()
        fetchDataCourse()
    },[])

    return(
        <div className="w-full h-auto flex-col items-center">
            <div className="w-auto h-auto flex mt-40">
                <div className="w-1/3 h-auto flex-col ml-5">
                    <div className="w-[30rem] h-auto flex mb-3">
                        <div className="flex flex-col h-auto w-5/12 px-1">
                            <label className="text-gray-600 font-semibold">ID</label>
                            <input type="text" name="id" placeholder="id" id="id" className="p-2 border border-gray-300 rounded-lg" onChange={e =>setIdDepartment(e.target.value)} value={idDepartment}/>
                        </div>
                        <div className="flex flex-col h-auto w-5/12 px-1">
                            <label className="text-gray-600 font-semibold">Department Name</label>
                            <input type="text" name="department" placeholder="Department Name" id="name" className="p-2 border border-gray-300 rounded-lg" onChange={e=>setDepartment(e.target.value)} value={department}/>
                        </div>
                        <div className="w-full sm:w-auto mt-6">
                            <button className="px-4 py-2 bg-fuchsia-400 rounded-lg text-white font-semibold" onClick={postDataDepartment}>
                                ADD
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-[30rem] text-lg font-semibold">-- OR CHOOSE FILE--</div>
                    <div className="flex w-[30rem]">
                        <input type="file" onChange={handleFileDepartmentChange} className="w-1/3"/>
                        <div className="w-1/3"/>
                        <button className="w-1/3 px-4 py-2 bg-fuchsia-400 rounded-lg text-white font-semibold" onClick={postDepartments}>
                            ADD
                        </button>
                    </div>
                    <div className="font-semibold flex flex-col items-center w-[30rem] text-lg">Fakultas</div>
                    {
                        departmentData&&departmentData.map((item)=>{
                            return(
                                <div className="w-[30rem] h-auto border border-gray-300 rounded-lg flex-none relative my-1 p-2">
                                    <div className="w-[30 rem] h-auto flex justify-between">
                                        <div className="font-normal">
                                            {item.department_name}
                                        </div>
                                        <button className="bg-pink-400 p-1 text-white font-semibold rounded-lg" onClick={async ()=>{
                                            console.log(item.id)
                                            await axios.delete(`http://localhost:8080/department/${item.id}`)
                                                .then((response)=>{
                                                    if (response.status<400){
                                                        toast.success(`${item.department_name} berhasil dihapus`)
                                                        fetchDataDepartment()
                                                    }
                                                })
                                        }}>
                                            DELETE
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-1/3 h-auto flex-col">
                    <div className="w-[30rem] flex-col h-auto">
                        <div className="w-[30rem] flex h-auto">
                            <div className="w-2/12 h-auto flex-col px-1 my-7">
                                <select value={idDepartmentMajor} onChange={handleSelectMajor} className="border border-gray-200 p-1 w-full rounded-lg">
                                    {
                                        departmentData&&departmentData.map((item)=>(
                                            <option key={item?.id} value={item?.id}>{item?.id}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-4/12 h-auto flex-col px-1">
                                <label className="text-gray-600 font-semibold">ID</label>
                                <input type="text" placeholder="ID" value={idMajor} onChange={e=>{setIdMajor(e.target.value)}} className="w-full p-2 border border-gray-300 rounded-lg"/>
                            </div>
                            <div className="w-4/12 h-auto flex-col px-1">
                                <label className="text-gray-600 font-semibold">Major Name</label>
                                <input type="text" placeholder="Major Name" value={major} onChange={e=>{setMajor(e.target.value)}} className="w-full p-2 border border-gray-300 rounded-lg"/>
                            </div>
                            <div className="w-2/12 h-auto flex-col my-6 px-1">
                                <button className="px-4 py-2 bg-fuchsia-400 rounded-lg text-white font-semibold w-full" onClick={postMajor}>
                                    ADD
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-[30rem] text-lg font-semibold">-- OR CHOOSE FILE--</div>
                        <div className="flex w-[30rem]">
                            <input type="file" onChange={handleFileMajorChange} className="w-1/3"/>
                            <div className="w-1/3"/>
                            <button className="w-1/3 px-4 py-2 bg-fuchsia-400 rounded-lg text-white font-semibold" onClick={postMajors}>
                                ADD
                            </button>
                        </div>
                        <div className="font-semibold flex flex-col items-center w-[30rem] text-lg">Jurusan</div>
                        {
                            majorData&&majorData.map((item)=>{
                                return(
                                    <div className="w-[30rem] h-auto border border-gray-300 rounded-lg flex-none relative my-1 p-2">
                                        <div className="w-[30 rem] h-auto flex justify-between">
                                            <div className="font-normal">
                                                {item.major_name}
                                            </div>
                                            <button className="bg-pink-400 p-1 text-white font-semibold rounded-lg" onClick={async ()=>{
                                                console.log(item.id)
                                                await axios.delete(`http://localhost:8080/major/${item.id}`)
                                                    .then((response)=>{
                                                        if (response.status<400){
                                                            toast.success(`${item.major_name} berhasil dihapus`)
                                                            fetchDataMajor()
                                                        }
                                                    })
                                            }}>
                                                DELETE
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="w-1/3 h-auto flex-col">
                    <div className="w-[30rem] flex-col h-auto">
                        <div className="w-[30rem] flex h-auto">
                            <div className="w-2/12 h-auto flex-col px-1 mt-7">
                                <select value={idDepartmentMajor} onChange={e=>{setMajorCourse(e.target.value)}} className="border border-gray-200 p-1 w-full rounded-lg">
                                    {
                                        majorData&&majorData.map((item)=>(
                                            <option key={item?.major_name} value={item?.major_name}>{item?.id}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-4/12 h-auto flex-col px-1 mt-1">
                                <label className="text-gray-600 font-semibold">Expectation</label>
                                <select value={expectation} onChange={e=>{setExpectation(e.target.value)}} className="border border-gray-200 p-1 w-full rounded-lg">
                                    {
                                        arrExpectation&&arrExpectation.map((item)=>(
                                            <option key={item} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-4/12 h-auto flex-col px-1 mt-1">
                                <label className="text-gray-600 font-semibold">Credit</label>
                                <select value={credits} onChange={e=>{setCredits(e.target.value)}} className="border border-gray-200 p-1 w-full rounded-lg">
                                    {
                                        arrSKS&&arrSKS.map((item)=>(
                                            <option key={item} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-4/12 h-auto flex-col px-1">
                                <label className="text-gray-600 font-semibold">Semester</label>
                                <input type="number" placeholder="Semester" value={semester} onChange={e=>{setSemester(e.target.value)}} className="w-full p-2 border border-gray-300 rounded-lg"/>
                            </div>
                        </div>
                        <div className="w-[30rem] flex h-auto">
                            <div className="w-1/2 h-auto flex-col px-1">
                                <label className="text-gray-600 font-semibold">ID</label>
                                <input type="text" placeholder="ID" value={idCourse} onChange={e=>{setIdCourse(e.target.value)}} className="w-full p-2 border border-gray-300 rounded-lg"/>
                            </div>
                            <div className="w-1/2 h-auto flex-col px-1">
                                <label className="text-gray-600 font-semibold">Course Name</label>
                                <input type="text" placeholder="Course Name" value={course} onChange={e=>{setCourse(e.target.value)}} className="w-full p-2 border border-gray-300 rounded-lg"/>
                            </div>
                        </div>
                        <button className="w-full px-6 mt-4 mb-4-2 py-2 bg-fuchsia-400 rounded-lg text-white font-semibold" onClick={postCourse}>
                            ADD
                        </button>
                        <div className="flex flex-col items-center w-[30rem] text-lg font-semibold mt-2">-- OR CHOOSE FILE--</div>
                        <div className="flex w-[30rem]">
                            <input type="file" onChange={handleFileCourseChange} className="w-1/3"/>
                            <div className="w-1/3"/>
                            <button className="w-1/3 px-4 py-2 bg-fuchsia-400 rounded-lg text-white font-semibold" onClick={postCourses}>
                                ADD
                            </button>
                        </div>
                        <div className="font-semibold flex flex-col items-center w-[30rem] text-lg">Mata Kuliah</div>
                        {
                            courseData&&courseData.map((item)=>{
                                return(
                                    <div className="w-[30rem] h-auto border border-gray-300 rounded-lg flex-none relative my-1 p-2">
                                        <div className="w-[30 rem] h-auto flex justify-between">
                                            <div className="font-normal">
                                                {item.name}
                                            </div>
                                            <button className="bg-pink-400 p-1 text-white font-semibold rounded-lg" onClick={async ()=>{
                                                console.log(item.id)
                                                await axios.delete(`http://localhost:8080/course/${item.id}`)
                                                    .then((response)=>{
                                                        if (response.status<400){
                                                            toast.success(`${item.name} berhasil dihapus`)
                                                            fetchDataCourse()
                                                        }
                                                    })
                                            }}>
                                                DELETE
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}