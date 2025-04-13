import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { token } from '../../../store/token';
import { ICreatForm, IArticle } from '../../../store/types-and-interfaces/article';
import { useCreateArticleMutation, useEditArticleMutation, useGetArticleQuery } from '../../../store/slice/apiSlice';
import styles from '../../../style/form.module.css';

export default function CreateArticleForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IArticle>();

  const navigate = useNavigate();

  const [tags, setTags] = useState<string[]>(['']);

  function changeTag(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const newValue: string = e.target.value.trim();
    const updatedTags = [...tags];
    updatedTags[index] = newValue;
    setTags(updatedTags);
  }

  function addTag() {
    setTags([...tags, '']);
  }

  function deleteTag(index: number) {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  }

  const [createArticle, { isLoading: isLoadingCreate }] = useCreateArticleMutation();

  const [editArticle, { isLoading: isLoadingEdit }] = useEditArticleMutation();

  const { slug } = useParams();

  async function onSubmit(formData: ICreatForm) {
    const tagsList = tags.filter((tag) => tag !== '');

    const data = {
      ...formData,
      tagList: tagsList,
    };

    if (slug) {
      await editArticle({ slug, token, data }).unwrap();
    } else {
      await createArticle({ data, token }).unwrap();
    }
    navigate('/articles');
  }

  const { data: articleInfo } = useGetArticleQuery({ slug, token }, { skip: !slug });

  useEffect(() => {
    if (articleInfo) {
      const { title, description, body, tagList } = articleInfo.article;
      setTags(tagList.length > 0 ? tagList : ['']);
      reset({
        title: title,
        description: description,
        body: body,
        tagList: tags,
      });
    }
  }, [articleInfo]);

  return (
    <div className={styles.pageForm}>
      <form className={`${styles['form']} ${styles['formEdit']}`} onSubmit={handleSubmit(onSubmit)}>
        {slug ? (
          <h1 className={styles.formTitle}>Edit article</h1>
        ) : (
          <h1 className={styles.formTitle}>Create new article</h1>
        )}
        <ul className={styles.formGroup}>
          <li className={styles.formGroupItem}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              type="text"
              id="title"
              className={styles.input}
              placeholder="Title"
              autoFocus
              {...register('title', {
                required: 'Это поле обязательно для заполнения',
              })}
            />
            {errors.title && <span className={styles.error}>{String(errors.title.message)}</span>}
          </li>
          <li className={styles.formGroupItem}>
            <label htmlFor="description" className={styles.label}>
              Short description
            </label>
            <input
              id="description"
              className={styles.input}
              placeholder="Short description"
              {...register('description', {
                required: 'Это поле обязательно для заполнения',
              })}
            />
            {errors.description && <span className={styles.error}>{String(errors.description.message)}</span>}
          </li>
          <li className={styles.formGroupItem}>
            <label htmlFor="text" className={styles.label}>
              Text
            </label>
            <textarea
              id="text"
              className={`${styles.input} ${styles.inputTextarea}`}
              placeholder="Text"
              {...register('body', {
                required: 'Это поле обязательно для заполнения',
              })}
            />
            {errors.body && <span className={styles.error}>{String(errors.body.message)}</span>}
          </li>
          <li className={styles.formGroupItem}>
            <label htmlFor="tagList" className={styles.label}>
              Tags
            </label>
            <div className={styles.tagsContainer}>
              {tags.map((tag, index) => (
                <div key={index} className={styles.tagContainer}>
                  <input
                    type="text"
                    id={`${index}`}
                    className={styles.input}
                    placeholder="tag"
                    value={tag}
                    onChange={(e) => changeTag(e, index)}
                  />
                  {tags.length > 1 && (
                    <Button
                      danger
                      className={`${styles.formBtn} ${styles.formBtnDelete}`}
                      onClick={() => deleteTag(index)}
                    >
                      Delete
                    </Button>
                  )}
                  {index === tags.length - 1 && (
                    <Button
                      color="primary"
                      variant="outlined"
                      className={`${styles.formBtn} ${styles.formBtnAdd}`}
                      onClick={addTag}
                    >
                      Add Tag
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </li>
        </ul>
        <Button
          type="primary"
          htmlType="submit"
          className={`${styles.formBtn} ${styles.formBtnSubmit} ${(isLoadingCreate || isLoadingEdit) && styles.disabled}`}
        >
          Send
        </Button>
      </form>
    </div>
  );
}
