import { Form, Input, FormItem, Row, Col, Select, Divider, Button, Modal, Table, Switch, TabPane, Tabs } from 'iview';
export default {
	name: 'Label',
  components: {
    Row,
    Col,
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
	},
	created () {
		this.formData = {}
	}
}