/**
 * 菜单列表表格配置文件
 */
export default {
  // 查询条件配置
  queryConditions: [
    {
      prop: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input',
      span: 6
    },
    {
      prop: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input',
      span: 6
    },
    {
      prop: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input',
      span: 6
    },
    {
      prop: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input',
      span: 6
    },
    {
      prop: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input',
      span: 6
    },
    {
      prop: 'status',
      label: '状态',
      placeholder: '请选择状态',
      type: 'select',
      span: 6,
      options: [
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' }
      ],
      clearable: true
    },
    {
      prop: 'createTime',
      label: '创建时间',
      type: 'daterange',
      span: 6,
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  ],

  // 表格列配置
  columns: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'path',
      label: '路由路径',
      width: 200,
      showOverflowTooltip: true
    },
    {
      prop: 'icon',
      label: '图标',
      width: 100,
      slot: 'icon'
    },
    {
      label: '状态信息',
      children: [
        {
          prop: 'status',
          label: '状态',
          width: 100,
          formatter: (row) => {
            return row.status === '1' ? '启用' : '禁用'
          }
        },
        {
          prop: 'sort',
          label: '排序',
          width: 100
        }
      ]
    },
    {
      prop: 'createTime',
      label: '创建时间',
      width: 180,
      sortable: true
    },
    {
      prop: 'actions',
      label: '操作',
      type: 'action',
      fixed: 'right',
      width: 200,
      buttons: [
        {
          label: '编辑',
          type: 'primary',
          id: 'edit',
          funcName: 'handleEdit',
          icon: 'Edit',
          size: 'small'
        },
        {
          label: '删除',
          type: 'danger',
          id: 'delete',
          funcName: 'handleDelete',
          icon: 'Delete',
          size: 'small',
          confirm: {
            title: '确认删除',
            message: '删除后不可恢复，是否继续？',
            type: 'warning'
          }
        },
        {
          label: '查看',
          type: 'info',
          id: 'view',
          funcName: 'handleView',
          icon: 'View',
          size: 'small'
        },
        {
          label: '复制',
          type: 'warning',
          id: 'copy',
          funcName: 'handleCopy',
          icon: 'CopyDocument',
          size: 'small'
        }
      ]
    }
  ],

  // 表格配置
  tableConfig: {
    stripe: true,
    border: true,
    height: 'auto',
    maxHeight: 600,
    // 是否自适应高度
    // true: 表格高度按内容展开，最高占满剩余空间，内容超出则内容区滚动（默认）
    // false: 占满屏幕高度剩余空间
    autoHeight: true,

    // 行选择配置
    selection: {
      enabled: true,
      type: 'multiple',
      rowClickSelect: true,
      reserveSelection: true
    },

    // 顶部按钮配置
    topButtons: [
      {
        label: '新增菜单',
        type: 'primary',
        id: 'add',
        funcName: 'handleAdd',
        icon: 'Plus'
      },
      {
        label: '导出',
        type: 'success',
        id: 'export',
        funcName: 'handleExport',
        icon: 'Download'
      },
      {
        label: '批量删除',
        type: 'danger',
        id: 'batchDelete',
        funcName: 'handleBatchDelete',
        icon: 'Delete'
      }
    ]
  }
}
