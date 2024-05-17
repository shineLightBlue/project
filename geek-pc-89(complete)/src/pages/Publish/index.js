import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useHistory, useParams } from 'react-router-dom'
import styles from './index.module.scss'
// 富文本编辑器
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { Channel } from '@/components/Channel'
import { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { updateArticle, getArticleById } from '@/store/actions'

const Publish = () => {
  // 创建 Form 实例
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()
  // fileList 用来表示已上传的文件列表（图片列表数据）
  // 因为可以上传多张图片，所以，它的值是一个数组
  // 数组中的每一项都是一个对象，对象可以有很多属性，对我们使用来说最主要的是 图片地址 url 属性
  // 所以，此处，我们约定只需要提供 url 属性即可。因此，存储已上传图片的数据：
  //  [ { url: '图片地址' }, { url: '图片地址' } ]
  // const [fileList, setFileList] = useState([
  //   {
  //     url: 'http://geek.itheima.net/resources/images/52.jpg'
  //   }
  // ])
  const [fileList, setFileList] = useState([])

  // 控制Upload组件图片上传数量，默认值为：1 表示默认选中的是单图
  const [maxCount, setMaxCount] = useState(1)

  // 创建存储所有图片的 ref 对象
  // 这个 ref 对象，就是存储所有已上传图片的仓库（数据源），将来要用几张，就从 ref 中获取几张
  const fileListRef = useRef([])
  // 获取路由参数
  const { id } = useParams()
  // 是否为编辑状态
  // 因为当前进入页面时是编辑还是发布，只要进入页面就可以确定下来，然后，就不会再发生改变
  // 除非重新进入该页面。所以，这个值在组件更新期间不会改变，所以，直接使用变量即可，不需要创建状态
  const isEdit = id !== undefined

  // 从 redux 中获取到文章详情数据
  // const detail = useSelector(state => state.publish)
  // console.log(detail)

  // 进入页面时，就发送请求，获取文章详情数据
  useEffect(() => {
    const loadData = async () => {
      // 判断是否为编辑状态，如果是，再发送请求；否则，直接 return
      // if (id === undefined) return
      if (!isEdit) return

      // 注意：因为 dispatch 是异步 action，所以，此处一定要通过 await 等待
      //      异步操作完成后，才能拿到 action 返回的文章详情数据
      const detail = await dispatch(getArticleById(id))
      // console.log('在 effect 中获取到 action 的返回值：', detail)
      const {
        title,
        channel_id,
        cover: { type, images },
        content
      } = detail

      // 将数据回显到 Form 表单中
      form.setFieldsValue({
        title,
        channel_id,
        type,
        content
      })

      // 回显图片数据
      const newFileList = images.map(item => ({ url: item }))
      setFileList(newFileList)
      // 设置最大上传数量
      setMaxCount(type)
      // 将图片数据存储到 ref
      fileListRef.current = newFileList
    }
    // 注意：不要忘记调用该函数
    loadData()
  }, [dispatch, id, isEdit, form])

  // 监听上传文件改变时的事件
  const onUploadChange = info => {
    // console.log(info)
    // 这里麻烦老师再讲一下, 这个info中也有file这个对象, file中也有response的url ,
    // 为什么还要去遍历第二个fileList 数组 , 返回的这个file文件也不是很清楚
    const newFileList = info.fileList.map(file => {
      if (file.response) {
        // 有响应数据的时候
        return {
          url: file.response.data.url
        }
      }

      // 如果还没有 response 说明，图片还在上传过程中
      // 此时，为了让后续图片上传完成后，能够正确拿到 图片地址 ，所以，此处需要暂时将 file 返回
      // 如果不把 file 返回，会导致 onChange 不会重复执行，这样，将来无法拿到 图片上传成功时 的图片数据了
      return file
    })

    // 将已上传的图片，存储到 ref 对象中
    fileListRef.current = newFileList

    setFileList(newFileList)
  }

  // 修改图片上传数量
  const changeType = e => {
    const count = e.target.value
    setMaxCount(count)

    if (count === 1) {
      // 从 ref 中取出第一张
      // 判断 ref 中有没有图片，如果索引为 0 的没有，说明一张图片都没有
      // 此时，单图，直接设置为 空数组 即可
      // 如果有，就拿到 索引为0 的图片，然后，组装成数组，再给 fileList（ 因为 filelist 的值应该是一个数组 ）
      const newFileList = fileListRef.current[0] ? [fileListRef.current[0]] : []
      setFileList(newFileList)
    } else if (count === 3) {
      // 从 ref 中取出全部
      setFileList(fileListRef.current)
    }
  }

  // 封装发布或编辑文章
  const saveArticles = async (values, msg, isDraft) => {
    if (values.type !== fileList.length)
      return message.warning('封面数量与所选类型不匹配')

    const { type, ...restValues } = values

    const data = {
      ...restValues,
      cover: {
        type,
        images: fileList.map(item => item.url)
      }
    }

    // 编辑时，添加 id 属性
    if (isEdit) {
      data.id = id
    }

    await dispatch(updateArticle(data, isDraft, isEdit))

    // 成功后，跳转到内容管理页面
    message.success(msg, 1, () => {
      history.push('/home/article')
    })
  }

  // 表单提交 - 发布文章 或 编辑文章
  const onFinish = async values => {
    try {
      saveArticles(values, isEdit ? '编辑成功' : '发表成功', false)
    } catch { }
  }

  // 存入草稿 - 发布时存入草稿 和 编辑时存入草稿
  const saveDraft = async () => {
    try {
      // 触发表单进行验证
      const values = await form.validateFields()

      saveArticles(values, '存入草稿成功', true)
    } catch (e) {
      // 因为表单校验的信息，在页面中都会有相应的提示，所以，此处不需要额外处理错误
      // 但是，需要提供一个 try-catch 来阻止校验失败时，在控制台中报错
      // console.log('校验失败：', e)
    }
  }

  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {isEdit ? '编辑文章' : '发布文章'}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: '' }}
          // 注意： Form 表单的 initialValues 仅仅是用来设置默认值，无法动态设置表单中的数据
          // initialValues={detail}
          onFinish={onFinish}
          // 将创建好的 form 设置为 Form 组件的 form 属性值
          // 设置后，就可以通过 form 来拿到 Form 表单实例了
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Channel width={400} />
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
                {/* <Radio value={-1}>自动</Radio> */}
              </Radio.Group>
            </Form.Item>
            {maxCount !== 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                multiple={maxCount === 3}
                maxCount={maxCount}
                fileList={fileList}
                onChange={onUploadChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {isEdit ? '编辑文章' : '发布文章'}
              </Button>
              <Button size="large" onClick={saveDraft}>
                存入草稿
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
