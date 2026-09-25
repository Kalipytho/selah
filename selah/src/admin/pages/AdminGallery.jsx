import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ImagePlus,
  Pencil,
  Trash2,
  Upload,
  X,
} from 'lucide-react'

import AdminSidebar from '../components/AdminSidebar'

const API_URL = 'https://selah-qsla.onrender.com/api'

function AdminGallery() {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [order, setOrder] = useState('0')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const token = localStorage.getItem('selah_admin_token')

  const loadGallery = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/gallery`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not load gallery')
      }

      setGallery(data.gallery || [])
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

    loadGallery()
  }, [])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setOrder('0')
    setImage(null)
    setPreview('')
    setEditingItem(null)
    setShowForm(false)
  }

  const openAddForm = () => {
    resetForm()
    setShowForm(true)
    setError('')
    setSuccess('')
  }

  const openEditForm = (item) => {
    setEditingItem(item)
    setTitle(item.title)
    setDescription(item.description || '')
    setOrder(String(item.order || 0))
    setImage(null)
    setPreview(item.imageUrl)
    setShowForm(true)
    setError('')
    setSuccess('')
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (!title.trim()) {
      setError('Please enter a title.')
      return
    }

    if (!editingItem && !image) {
      setError('Please select an image.')
      return
    }

    try {
      setSaving(true)

      const formData = new FormData()

      formData.append('title', title)
      formData.append('description', description)
      formData.append('order', order)

      if (image) {
        formData.append('image', image)
      }

      const url = editingItem
        ? `${API_URL}/gallery/${editingItem._id}`
        : `${API_URL}/gallery`

      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not save gallery item')
      }

      setSuccess(
        editingItem
          ? 'Gallery image updated successfully.'
          : 'Gallery image added successfully.',
      )

      resetForm()
      await loadGallery()
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this gallery image?',
    )

    if (!confirmed) return

    try {
      setError('')
      setSuccess('')

      const response = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not delete image')
      }

      setSuccess('Gallery image deleted successfully.')

      await loadGallery()
    } catch (error) {
      setError(error.message)
    }
  }

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
                Gallery
              </h1>

              <p className="mt-2 text-sm text-[#2c211b]/50">
                Add and manage the photos shown on your Selah website.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddForm}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2c211b] px-5 py-3 text-sm font-semibold text-[#f5efe6] transition hover:-translate-y-0.5 hover:bg-[#6f4e37]"
            >
              <ImagePlus size={17} />
              Add photo
            </button>
          </div>

          {success && (
            <div className="mt-6 rounded-2xl border border-[#394337]/15 bg-[#394337]/10 px-4 py-3 text-sm text-[#394337]">
              {success}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-2xl border border-[#a65d3b]/20 bg-[#a65d3b]/10 px-4 py-3 text-sm text-[#7c3f29]">
              {error}
            </div>
          )}

          {showForm && (
            <div className="mt-8 rounded-[2rem] border border-[#2c211b]/10 bg-white p-6 shadow-xl shadow-[#2c211b]/5 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl text-[#2c211b]">
                    {editingItem ? 'Edit gallery photo' : 'Add gallery photo'}
                  </h2>

                  <p className="mt-1 text-sm text-[#2c211b]/45">
                    {editingItem
                      ? 'Update the photo information.'
                      : 'Upload a new photo for your website.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2c211b]/10 text-[#2c211b]/50 transition hover:bg-[#2c211b]/5 hover:text-[#2c211b]"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-7">
                <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                      Photo
                    </label>

                    <label className="mt-2 flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-[#2c211b]/10 bg-[#f5efe6] transition hover:border-[#a65d3b]/40">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload
                            size={28}
                            className="mx-auto text-[#2c211b]/30"
                          />

                          <p className="mt-3 text-sm font-medium text-[#2c211b]/60">
                            Choose an image
                          </p>

                          <p className="mt-1 text-xs text-[#2c211b]/35">
                            JPG, PNG or WEBP
                          </p>
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                      Title
                    </label>

                    <input
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="A place to pause"
                      className="mt-2 w-full rounded-2xl border border-[#2c211b]/10 bg-[#f5efe6]/50 px-4 py-3.5 text-sm outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/10"
                    />

                    <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                      Description
                    </label>

                    <textarea
                      value={description}
                      onChange={(event) =>
                        setDescription(event.target.value)
                      }
                      rows={5}
                      placeholder="Describe this Selah moment..."
                      className="mt-2 w-full resize-none rounded-2xl border border-[#2c211b]/10 bg-[#f5efe6]/50 px-4 py-3.5 text-sm outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/10"
                    />

                    <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.15em] text-[#2c211b]/60">
                      Display order
                    </label>

                    <input
                      type="number"
                      value={order}
                      onChange={(event) => setOrder(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#2c211b]/10 bg-[#f5efe6]/50 px-4 py-3.5 text-sm outline-none transition focus:border-[#a65d3b]/40 focus:ring-4 focus:ring-[#a65d3b]/10"
                    />

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2c211b] px-6 py-3 text-sm font-semibold text-[#f5efe6] transition hover:bg-[#6f4e37] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {saving && (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        )}

                        {saving
                          ? 'Saving...'
                          : editingItem
                            ? 'Update photo'
                            : 'Add photo'}
                      </button>

                      <button
                        type="button"
                        onClick={resetForm}
                        className="rounded-full border border-[#2c211b]/10 px-6 py-3 text-sm font-semibold text-[#2c211b] transition hover:bg-[#2c211b]/5"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          <section className="mt-8">
            {loading ? (
              <div className="rounded-[2rem] bg-white p-12 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#2c211b]/10 border-t-[#a65d3b]" />

                <p className="mt-4 text-sm text-[#2c211b]/45">
                  Loading gallery...
                </p>
              </div>
            ) : gallery.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-[#2c211b]/15 bg-white p-12 text-center">
                <ImagePlus
                  size={40}
                  className="mx-auto text-[#2c211b]/20"
                />

                <h2 className="mt-5 font-display text-2xl">
                  Your gallery is empty
                </h2>

                <p className="mt-2 text-sm text-[#2c211b]/45">
                  Add your first Selah photo.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {gallery.map((item) => (
                  <article
                    key={item._id}
                    className="group overflow-hidden rounded-[2rem] border border-[#2c211b]/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2c211b]">
                        #{item.order}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-display text-xl text-[#2c211b]">
                        {item.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#2c211b]/50">
                        {item.description || 'No description added.'}
                      </p>

                      <div className="mt-5 flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(item)}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2c211b]/10 px-4 py-2.5 text-sm font-semibold text-[#2c211b] transition hover:bg-[#2c211b]/5"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#a65d3b]/15 text-[#a65d3b] transition hover:bg-[#a65d3b]/10"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default AdminGallery