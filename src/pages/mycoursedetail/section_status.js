import { useEffect, useState } from 'react'

const SectionStatus = ({ sectionid }) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    check_and_set()
  }, [])

  const check_and_set = () => {
    const list = localStorage.getItem('sections')
    if (list === null) {
      localStorage.setItem('sections', JSON.stringify([]))
    } else {
      //   console.log(JSON.parse(list))
      const newList = JSON.parse(list)
      if (newList.includes(sectionid)) {
        setChecked(true)
      }
    }
  }

  const handleChecked = () => {
    let list = JSON.parse(localStorage.getItem('sections'))
    let newList = []
    if (list.includes(sectionid)) {
      newList = list.filter(item => item !== sectionid)
    } else {
      newList = [...list, sectionid]
    }

    localStorage.setItem('sections', JSON.stringify(newList))
    setChecked(!checked)
  }

  return (
    <>
      <label className='relative inline-flex items-center mb-5 cursor-pointer'>
        <input
          type='checkbox'
          //   value={checked}
          className='sr-only peer'
          onChange={handleChecked}
          checked={checked}
        />
        <div className="w-9 h-5 bg-primary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary-300 dark:peer-focus:ring-secondary-800 rounded-full peer dark:bg-primary-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-primary-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-primary-600 peer-checked:bg-secondary-600"></div>
        <span className='ml-3 text-sm font-medium text-primary-900 dark:text-primary-300'>
          {checked ? <>Completeted</> : <>Mark as completed</>}
        </span>
      </label>
    </>
  )
}

export default SectionStatus
