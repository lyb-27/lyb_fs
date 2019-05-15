<template>
	<div>
		<Form ref="filterForm" :model="formData" :label-width="90" class="filter-form">
			<Row :gutter="15">
				<Col :xs="24" :sm="12">
					<FormItem label="添加标签:" prop="name">
						<Input v-model.trim="formData.name" placeholder="请输入标签名"></Input>
					</FormItem>
				</Col>
			</Row>
		</Form>
		<Divider />
		<div class="text-right">
      <slot :formData="formData"></slot>
    </div>
	</div>
</template>

<script  src="./Label.js">
</script>

