import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import DisplayTable from '../components/DisplayTable'
import ViewImage from '../components/ViewImage'
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import EditSubCategory from '../components/EditSubCategory'
import CofirmBox from '../components/CofirmBox'
import toast from 'react-hot-toast'

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [ImageURL, setImageURL] = useState("")
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({ _id: "" })
  const [deleteSubCategory, setDeleteSubCategory] = useState({ _id: "" })
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)

  const fetchSubCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })
      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const column = [
    {
      header: "Name",
      cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.name}</span>
    },
    {
      header: "Image",
      cell: ({ row }) => (
        <div className='flex justify-center items-center'>
          <img
            src={row.original.image}
            alt={row.original.name}
            className='w-9 h-9 object-contain cursor-pointer rounded border border-slate-200 bg-white p-1 hover:scale-105 transition-transform'
            onClick={() => setImageURL(row.original.image)}
          />
        </div>
      )
    },
    {
      header: "Category",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.category?.map((c) => (
            <span key={c._id + "cat"} className='bg-emerald-50 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-medium border border-emerald-200'>
              {c.name}
            </span>
          ))}
        </div>
      )
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={() => {
              setOpenEdit(true)
              setEditData(row.original)
            }}
            className='p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors'
            title="Edit"
          >
            <HiPencil size={18} />
          </button>
          <button
            onClick={() => {
              setOpenDeleteConfirmBox(true)
              setDeleteSubCategory(row.original)
            }}
            className='p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors'
            title="Delete"
          >
            <MdDelete size={18} />
          </button>
        </div>
      )
    }
  ]

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchSubCategory()
        setOpenDeleteConfirmBox(false)
        setDeleteSubCategory({ _id: "" })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className='p-4 bg-slate-50 min-h-screen'>
      <div className='p-4 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-between mb-4'>
        <div>
          <h2 className='text-lg font-bold text-slate-800'>Medicine Sub Categories</h2>
          <p className="text-xs text-slate-500">Organize medicines by formulation & sub-classes</p>
        </div>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className='text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors'
        >
          + Add Sub Category
        </button>
      </div>

      <div className='overflow-auto w-full'>
        <DisplayTable data={data} column={column} />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenAddSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {ImageURL && <ViewImage url={ImageURL} close={() => setImageURL("")} />}

      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {openDeleteConfirmBox && (
        <CofirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          close={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  )
}

export default SubCategoryPage
