import React, { useContext, useEffect, useState } from 'react';
import IconButton from '../ui/IconButton';
import { DocumentContext } from '../context/DocumentContext';

const DocumentName = () => {
  const { id, setFocus } = useContext(DocumentContext);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded) {
      fetch(`/documents/${id}/json/title`).then(async (result) => {
        setTitle(await result.json());
        setLoaded(true);
      });
    }
  }, [id, loaded]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfTokenElement?.getAttribute('content');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken as string,
    };

    const response = await fetch(`/documents/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        title,
      }),
    });

    if (response.ok) {
      setEditTitle(false);
      setFocus(true)
    }
  };

  return (
    <div className='document-name surface'>
      {editTitle ? (
        <form onSubmit={handleFormSubmit}>
          <input
          className='document-name name-input'
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => setEditTitle(false)}
            autoFocus
          />
        </form>
      ) : (
        <>
          <div onDoubleClick={() => {
            setEditTitle(true)
            setFocus(false)
          }}>{title}</div>
        </>
      )}
      <div style={{ marginLeft: '0.25rem' }}>
        <IconButton active={editTitle} toggleActive={() => {
          setEditTitle(true)
          setFocus(false)
        }}>edit</IconButton>
      </div>
    </div>
  );
};

export default DocumentName;
