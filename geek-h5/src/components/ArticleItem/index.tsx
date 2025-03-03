import classnames from 'classnames'

import { Icon } from '@/components/Icon'
import { Image } from 'antd-mobile'
import styles from './index.module.scss'
import dayjs from 'dayjs'
// 相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 国际化 - 中文
import 'dayjs/locale/zh-cn'
// 启用相对时间
dayjs.extend(relativeTime)
// 启用中文
dayjs.locale('zh-cn')
type Props = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  type: number
  title: string
  pubdate: string
  comm_count: number
  aut_name: string
  images: string[]
}

const ArticleItem = ({
  type,
  title,
  pubdate,
  comm_count,
  aut_name,
  images
}: Props) => {
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 && 't3',
          type === 0 && 'none-mt'
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {
              images.map((item, index) => (
                <div className="article-img-wrapper" key={index}>
                  <Image
                    lazy
                    style={{
                      '--width': '110px',
                      '--height': '75px'
                    }}
                    src={item}
                    alt=""
                  />
                </div>
              ))
            }
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 && 'none-mt')}>
        <span>{aut_name}</span>
        <span>{comm_count}</span>
        <span>{dayjs().from(dayjs(pubdate))}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
