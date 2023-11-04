import { ChangeEvent, FormEvent } from 'react'

import { Category } from '../../../redux/slices/categories/categorySlice'

type CategoryFormProps = {
  category: Category
  handleSubmit: (e: FormEvent) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function CategoryForm({ category, handleSubmit, handleChange }: CategoryFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input type="text" name="name" id="name" value={category.name} onChange={handleChange} />
        <button type="submit">Create</button>
      </div>
    </form>
  )
}
