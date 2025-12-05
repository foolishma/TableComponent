/**
 * Table 组件配置文件模板
 *
 * 使用说明：
 * 1. 复制此文件到 src/config/table-configs/ 目录
 * 2. 根据实际需求修改配置项
 * 3. 在页面组件中引入并使用 useTableConfig hooks 解析
 */

export default {
  // ========== 查询条件配置 ==========
  queryConditions: [
    {
      // 基础配置
      prop: 'name', // 字段名（必填）
      label: '名称', // 标签文本（必填）
      placeholder: '请输入名称', // 占位符（可选）
      type: 'input', // 类型（必填）：input | number | select | date | daterange | datetime | datetimerange | year | month | yearrange | monthrange | numberrange | slot
      span: 6, // 栅格占位（可选，默认6，一行24格）
      defaultValue: '', // 默认值（可选）

      // 下拉框配置
      dict: 'statusDict', // 字典编码（可选，用于下拉框）
      options: [
        // 选项列表（可选，用于下拉框，优先级高于dict）
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' }
      ],

      // 自定义插槽
      slot: 'customFilter', // 自定义插槽名称（可选，type为slot时必填）

      // 验证规则
      rules: [], // 验证规则（可选）

      // 其他配置
      disabled: false, // 是否禁用（可选）
      clearable: true, // 是否可清空（可选）

      // 日期相关配置
      format: 'YYYY-MM-DD', // 日期格式（可选，用于日期类型）
      valueFormat: 'YYYY-MM-DD', // 值格式（可选，用于日期类型）
      startPlaceholder: '开始日期', // 范围开始占位符（可选，用于范围类型）
      endPlaceholder: '结束日期' // 范围结束占位符（可选，用于范围类型）
    }
  ],

  // ========== 表格列配置 ==========
  columns: [
    {
      // 基础配置
      prop: 'id', // 字段名（必填，操作列可不填）
      label: 'ID', // 列标题（必填）
      width: 80, // 列宽度（可选）
      minWidth: 100, // 最小宽度（可选）
      fixed: 'left', // 固定列：'left' | 'right'（可选）
      align: 'center', // 对齐方式：'left' | 'center' | 'right'（可选）
      headerAlign: 'center', // 表头对齐方式（可选）

      // 功能配置
      sortable: true, // 是否可排序（可选）
      resizable: true, // 是否可调整宽度（可选）
      showOverflowTooltip: true, // 超出显示提示（可选）

      // 格式化
      formatter: (row, column, cellValue) => {
        // 格式化函数（可选）
        return cellValue
      },

      // 自定义列内容
      slot: 'customColumn', // 自定义列内容插槽（可选）

      // 多级表头
      children: [
        // 子列（可选，用于多级表头）
        {
          prop: 'child1',
          label: '子列1'
        }
      ]
    },

    // 操作列配置
    {
      prop: 'actions',
      label: '操作',
      type: 'action', // 操作列标识（必填）
      fixed: 'right', // 固定右侧（推荐）
      width: 200, // 操作列宽度
      buttons: [
        // 按钮配置（必填）
        {
          label: '编辑', // 按钮文本（必填）
          type: 'primary', // 按钮类型：'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'（可选）
          id: 'edit', // 按钮唯一标识（必填）
          funcName: 'handleEdit', // 函数名（必填）
          icon: 'Edit', // 图标名称（可选）
          size: 'small', // 按钮尺寸：'large' | 'default' | 'small'（可选）
          disabled: false, // 是否禁用（可选，支持函数：(row) => boolean）
          show: true, // 是否显示（可选，支持函数：(row) => boolean）
          loading: false, // 是否加载中（可选）
          confirm: {
            // 确认对话框（可选）
            title: '确认删除？',
            message: '此操作不可恢复',
            type: 'warning'
          }
        }
      ]
    }
  ],

  // ========== 表格配置 ==========
  tableConfig: {
    // 基础配置
    stripe: true, // 是否显示斑马纹（可选）
    border: true, // 是否显示边框（可选）
    height: 'auto', // 表格高度（可选）
    maxHeight: 600, // 最大高度（可选）

    // 行选择配置
    selection: {
      enabled: true, // 是否启用行选择（可选）
      type: 'multiple', // 选择类型：'single' | 'multiple'（可选）
      rowClickSelect: true, // 是否支持行点击选中（可选）
      reserveSelection: true, // 是否保留选择（分页时）（可选）
      selectable: (row) => {
        // 是否可选（可选）
        return row.status !== 'disabled'
      }
    },

    // 顶部按钮配置
    topButtons: [
      {
        label: '新增', // 按钮文本（必填）
        type: 'primary', // 按钮类型（可选）
        id: 'add', // 按钮唯一标识（必填）
        funcName: 'handleAdd', // 函数名（必填）
        icon: 'Plus', // 图标名称（可选）
        disabled: false, // 是否禁用（可选，支持函数：(selectedRows) => boolean）
        show: true // 是否显示（可选）
      }
    ]
  }
}
