import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface ListItem {
  id: number
  title: string
  content: string[]
}

const listItems: ListItem[] = [
  { id: 1, title: 'Item 1', content:[ 'Here is the expanded.','Here is the expanded.','Here is the expanded.'] },
  { id: 2, title: 'Item 2', content: [ 'Here is the expanded.','Here is the expanded.','Here is the expanded.']  },
  { id: 3, title: 'Item 3', content: [ 'Here is the expanded.','Here is the expanded.','Here is the expanded.']  },
  { id: 4, title: 'Item 4', content: [ 'Here is the expanded.','Here is the expanded.','Here is the expanded.']  },
]

const CategoryRelatedItems: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(null)

  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id)
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-white w-64 rounded-lg shadow-sm">
        {listItems.map((item) => (
          <div key={item.id} className="border-b border-gray-200 last:border-b-0 ">
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => e.key === 'Enter' && toggleItem(item.id)}
              tabIndex={0}
              role="button"
            >
              <h3 className="text-sm font-normal">{item.title}</h3>
              {openItemId === item.id ? (
                <FaChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <FaChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
            {openItemId === item.id && (
              <div className="px-4 pb-4 flex gap-2 flex-col">
                {item.content?.map((item,i)=>
                <li key={i} className="text-sm cursor-pointer text-gray-600 list-disc">{item}</li>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryRelatedItems