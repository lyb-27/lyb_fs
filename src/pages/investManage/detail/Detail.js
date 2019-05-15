import { Form, Input, FormItem, Row, Col, Select, Divider, Button, Modal, Table, Switch, TabPane, Tabs } from 'iview';
import LabelInfoItem from '@/components/base/label-info-item/';

export default {
  name: 'Detail',
  components: {
    Row,
    Col,
    LabelInfoItem,
    FormItem,
    Form,
    Divider,
    Button,
    Modal,
    Table,
    TabPane,
    Tabs,
    Input
  },
  data () {
    return {
      formData:{}
    }
  }
}
