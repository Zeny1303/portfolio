import React from 'react'

export function VybeDataModelsSection() {
  const models = [
    {
      name: 'User Model',
      collection: 'users',
      fields: [
        { name: 'clerkId', type: 'String (Unique Index)' },
        { name: 'fullName', type: 'String' },
        { name: 'imageUrl', type: 'String' },
        { name: 'timestamps', type: 'Date (createdAt/updatedAt)' },
      ],
    },
    {
      name: 'Song Model',
      collection: 'songs',
      fields: [
        { name: 'title', type: 'String' },
        { name: 'artist', type: 'String' },
        { name: 'audioUrl', type: 'String' },
        { name: 'source', type: 'Enum ("cloudinary"|"jamendo")' },
        { name: 'duration', type: 'Number' },
        { name: 'albumId', type: 'ObjectId (ref: Album)' },
      ],
    },
    {
      name: 'Album Model',
      collection: 'albums',
      fields: [
        { name: 'title', type: 'String' },
        { name: 'artist', type: 'String' },
        { name: 'imageUrl', type: 'String' },
        { name: 'releaseYear', type: 'Number' },
        { name: 'songs', type: 'Array [ObjectId (ref: Song)]' },
      ],
    },
    {
      name: 'Playlist Model',
      collection: 'playlists',
      fields: [
        { name: 'name', type: 'String' },
        { name: 'description', type: 'String' },
        { name: 'owner', type: 'String (Clerk User ID)' },
        { name: 'imageUrl', type: 'String' },
        { name: 'songs', type: 'Array [Embedded Song Objects]' },
      ],
    },
    {
      name: 'Like Model',
      collection: 'likes',
      fields: [
        { name: 'userId', type: 'String (Clerk ID)' },
        { name: 'songId', type: 'String' },
        { name: 'song', type: 'Object (Embedded Song)' },
        { name: 'index', type: 'Compound Index {userId, songId}' },
      ],
    },
    {
      name: 'Message Model',
      collection: 'messages',
      fields: [
        { name: 'senderId', type: 'String (Clerk ID)' },
        { name: 'receiverId', type: 'String (Clerk ID)' },
        { name: 'content', type: 'String' },
        { name: 'type', type: 'Enum ("text" | "song")' },
        { name: 'song', type: 'Object (Embedded Track)' },
      ],
    },
  ]

  return (
    <section className="vybe-section">
      <h2 className="vybe-section-title">Database Models & Schemas</h2>
      <p className="vybe-section-subtitle">
        Optimized Mongoose ODM schemas featuring compound indexes, embedded document references, and efficient query paths.
      </p>

      <div className="vybe-models-grid">
        {models.map((model, idx) => (
          <div key={idx} className="vybe-model-card">
            <div className="vybe-model-header">
              <span className="vybe-model-name">{model.name}</span>
              <span className="vybe-model-collection">{model.collection}</span>
            </div>
            <div className="vybe-model-fields">
              {model.fields.map((f, i) => (
                <div key={i} className="vybe-field-row">
                  <span className="vybe-field-name">{f.name}:</span>
                  <span className="vybe-field-type">{f.type}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
