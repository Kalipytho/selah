import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'

import AdminSidebar from '../components/AdminSidebar'

const API_URL = 'https://selah-qsla.onrender.com/api'

function AdminMenu() {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [order, setOrder] = useState('0')
  const [available, setAvailable] = useState(true)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const token = localStorage.getItem('selah_admin_token')

  const loadMenu = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/menu`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not load menu')
      }

      setMenu(data.menu || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      window.location.href = '/admin/login'
      return
    }

    loadMenu()
  }, [])

  const resetForm = () => {
    setCategory('')
    setName('')
    setPrice('')
    setOrder('0')
    setAvailable(true)
    setEditingItem(null)
    setShowForm(false)
  }

  const openAdd = () => {
    resetForm()
    setShowForm(true)
    setError('')
    setSuccess('')
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setCategory(item.category)
    setName(item.name)
    setPrice(item.price)
    setOrder(String(item.order || 0))
    setAvailable(item.available)
    setShowForm(true)
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (!category || !name || !price) {
      setError('Category, item name and price are required.')
      return
    }

    try {
      const url = editingItem
        ? `${API_URL}/menu/${editingItem._id}`
        : `${API_URL}/menu`

      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category,
          name,
          price,
          order: Number(order) || 0,
          available,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not save menu item')
      }

      setSuccess(
        editingItem
          ? 'Menu item updated successfully.'
          : 'Menu item added successfully.',
      )

      resetForm()
      await loadMenu()
    } catch (error) {
      setError(error.message)
    }
  }

  const deleteItem = async (id) => {
    if (!window.confirm('Delete this menu item?')) return

    try {
      const response = await fetch(`${API_URL}/menu/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not delete menu item')
      }

      setSuccess('Menu item deleted successfully.')
      await loadMenu()
    } catch (error) {
      setError(error.message)
    }
  }

  const categories = [...new Set(menu.map((item) => item.category))]

  return (
    <div className="min-h-screen bg-[#f5efe6]">
      <AdminSidebar />

      <main className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a65d3b]">
                Content manager
              </p>

              <h1 className="mt-2 font-display text-4xl text-[#2c211b]">
                Menu
              </h1>

              <p className="mt-2 text-sm text-[#2c211b]/50">
                Manage your food and drink items and prices.
              </p>
            </div>

            <button
              onClick={openAdd}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2c211b] px-5 py-3 text-sm font-semibold text-[#f5efe6] transition hover:bg-[#6f4e37]"
            >
              <Plus size={17} />
              Add item
            </button>
          </div>

          {success && (
            <div className="mt-6 rounded-2xl bg-[#394337]/10 px-4 py-3 text-sm text-[#394337]">
              {success}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-2xl bg-[#a65d3b]/10 px-4 py-3 text-sm text-[#7c3f29]">
              {error}
            </div>
          )}

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl sm:p-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl">
                  {editingItem ? 'Edit menu item' : 'Add menu item'}
                </h2>

                <button
                  type="button"
                  onClick={resetForm}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2c211b]/10"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                    Category
                  </label>

                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Burgers"
                    className="mt-2 w-full rounded-2xl border border-[#2c211b]/10 px-4 py-3.5 text-sm outline-none focus:border-[#a65d3b]/40"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                    Item name
                  </label>

                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Chicken Burger"
                    className="mt-2 w-full rounded-2xl border border-[#2c211b]/10 px-4 py-3.5 text-sm outline-none focus:border-[#a65d3b]/40"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                    Price
                  </label>

                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="700 ETB"
                    className="mt-2 w-full rounded-2xl border border-[#2c211b]/10 px-4 py-3.5 text-sm outline-none focus:border-[#a65d3b]/40"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                    Display order
                  </label>

                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#2c211b]/10 px-4 py-3.5 text-sm outline-none focus:border-[#a65d3b]/40"
                  />
                </div>
              </div>

              <label className="mt-5 flex items-center gap-3 text-sm text-[#2c211b]/70">
                <input
                  type="checkbox"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                />
                Available on website
              </label>

              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-[#2c211b] px-6 py-3 text-sm font-semibold text-[#f5efe6] hover:bg-[#6f4e37]"
                >
                  {editingItem ? 'Update item' : 'Add item'}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-[#2c211b]/10 px-6 py-3 text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="mt-8 rounded-[2rem] bg-white p-12 text-center">
              Loading menu...
            </div>
          ) : (
            <div className="mt-8 space-y-8">
              {categories.length === 0 ? (
                <div className="rounded-[2rem] bg-white p-12 text-center">
                  <h2 className="font-display text-2xl">
                    No menu items yet
                  </h2>

                  <p className="mt-2 text-sm text-[#2c211b]/45">
                    Add your first menu item.
                  </p>
                </div>
              ) : (
                categories.map((categoryName) => (
                  <section
                    key={categoryName}
                    className="overflow-hidden rounded-[2rem] bg-white shadow-sm"
                  >
                    <div className="border-b border-[#2c211b]/10 px-6 py-5">
                      <h2 className="font-display text-2xl">
                        {categoryName}
                      </h2>
                    </div>

                    <div className="divide-y divide-[#2c211b]/5">
                      {menu
                        .filter((item) => item.category === categoryName)
                        .map((item) => (
                          <div
                            key={item._id}
                            className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div>
                              <div className="flex items-center gap-3">
                                <h3 className="font-medium">
                                  {item.name}
                                </h3>

                                {!item.available && (
                                  <span className="rounded-full bg-[#a65d3b]/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-[#a65d3b]">
                                    Unavailable
                                  </span>
                                )}
                              </div>

                              <p className="mt-1 text-sm text-[#a65d3b]">
                                {item.price}
                              </p>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => openEdit(item)}
                                className="flex h-10 items-center gap-2 rounded-xl border border-[#2c211b]/10 px-4 text-sm font-semibold hover:bg-[#2c211b]/5"
                              >
                                <Pencil size={15} />
                                Edit
                              </button>

                              <button
                                onClick={() => deleteItem(item._id)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#a65d3b]/15 text-[#a65d3b] hover:bg-[#a65d3b]/10"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </section>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminMenu