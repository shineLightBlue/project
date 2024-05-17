import { useDispatch, useSelector } from 'react-redux'
import avatar from '../assets/back.jpg'
import { useEffect } from 'react'
import { getArticles } from '../store/actions/articles'
export const ArticleList = () => {
    const dispatch = useDispatch()
    const { activeId: channelId } = useSelector(state => state.channels)
    const articles = useSelector(state => state.articles)
    useEffect(() => {
        dispatch(getArticles(channelId))
    }, [dispatch, channelId])
    return (
        <div className="list">
            {
                articles.map(item => (
                    <div className="article_item" key={item.art_id}>
                        <h3>{item.title}</h3>
                        <div className="img_box">
                            <img src={item.cover.type === 0 ? avatar : item.cover.images[0]} className="w100" alt="" />
                        </div>
                        <div className="info_box">
                            <span>{item.aut_name}</span>
                            <span>{item.comm_count}评论</span>
                            <span>{item.pubdate}</span>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}