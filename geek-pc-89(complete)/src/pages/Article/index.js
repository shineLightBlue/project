import { Link, useHistory } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Table,
  Tag,
  Space,
  Modal
} from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'

import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

import img404 from '@/assets/error.png'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles, delArticle } from '@/store/actions'

// 导入我们自己创建的 Channel 组件
import { Channel } from '@/components/Channel'

const { RangePicker } = DatePicker
const { confirm } = Modal

// 优化文章状态的处理
const articleStatus = {
  0: { color: 'yellow', text: '草稿' },
  1: { color: '#ccc', text: '待审核' },
  2: { color: 'green', text: '审核通过' },
  3: { color: 'red', text: '审核失败' }
}

const Article = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { page, pageSize, count, list } = useSelector(state => state.article)
  // 用来存储 表单筛选数据 的 ref 对象
  const paramsRef = useRef({})

  useEffect(() => {
    dispatch(getArticles({}))
  }, [dispatch])

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      render: cover => {
        return <img src={cover ?? img404} width={200} height={150} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => {
        // if (data === 0) {
        //   return <Tag color="yellow">草稿</Tag>
        // } else if (data === 1) {
        //   return <Tag color="#ccc">待审核</Tag>
        // } else if (data === 2) {
        //   return <Tag color="green">审核通过</Tag>
        // } else if (data === 3) {
        //   return <Tag color="red">审核失败</Tag>
        // }

        // 使用对象属性的访问，替代了 原来的 if-else 或 switch-case 判断
        const tagData = articleStatus[data]
        // console.log(tagData)
        return <Tag color={tagData.color}>{tagData.text}</Tag>
      }
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      // 因为该 列 不对应任何的数据（也就是没有 dataIndex 属性）
      // 所以，可以通过第一个参数 data 来拿到每一行的数据
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => history.push(`/home/publish/${data.id}`)}
            />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteArticle(data.id)}
            />
          </Space>
        )
      }
    }
  ]

  // 删除文章的事件
  const onDeleteArticle = id => {
    confirm({
      title: '温馨提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该文章, 是否继续？',
      async onOk() {
        // 删除数据
        await dispatch(delArticle(id))
        // 删除数据后，再获取最新的文章列表数据
        await dispatch(getArticles(paramsRef.current))
      }
    })
  }

  // 筛选数据
  const onSearch = values => {
    const { status, channel_id, date } = values
    // 将表单中选中数据，组装成接口需要的数据格式，然后，传递给接口
    const params = {}

    // 处理状态
    if (status !== -1) {
      params.status = status
    }

    // 处理频道
    // if (channel_id !== undefined) {
    if (typeof channel_id !== 'undefined') {
      params.channel_id = channel_id
    }

    // 日期范围
    if (typeof date !== 'undefined' && date !== null) {
      // if (date != undefined) {
      params.begin_pubdate = date[0].format('YYYY-MM-DD HH:mm:ss')
      params.end_pubdate = date[1].format('YYYY-MM-DD HH:mm:ss')
    }

    // 将组装好的 params 参数，存到 ref 对象中
    paramsRef.current = params

    // console.log('params:', params)
    dispatch(getArticles(params))
  }

  // 分页
  const changePage = (page, pageSize) => {
    const params = {
      ...paramsRef.current,
      page,
      per_page: pageSize
    }

    // 在分页后，将 分页数据 也保存到 ref 对象中
    paramsRef.current = params

    dispatch(getArticles(params))
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: -1 }} onFinish={onSearch}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Channel width={264} />
          </Form.Item>

          <Form.Item label="日期" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        {/* 
          rowKey="id" 表示使用数据源中哪个属性名来为 表格 指定 key 属性
        */}
        <Table
          columns={columns}
          dataSource={list}
          rowKey="id"
          pagination={{
            current: page,
            pageSize,
            total: count,
            showSizeChanger: true,
            position: ['bottomCenter'],
            onChange: changePage
          }}
        />
      </Card>
    </div>
  )
}

export default Article
