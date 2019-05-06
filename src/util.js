export function getUserRedirectPath({
	type
}) {
	let url = (type == 0) ? '/teacher' : '/student'
	return url
}

export function getStudentRedirectPath(type, id) {
	// console.log('student util', type)
	switch (type) {
		case 'test':
			return '/student/test'
		case 'stuTestPage':
			return '/student/stuTestPage/testId=' + id
	
	}
}

export function getTeacherRedirectPath(type, id) {
	// console.log('teacher util', type)

	switch (type) {
		case 'paper':
			return '/teacher/paper'
		case 'test':
			return '/teacher/test'
		case 'paperDetail':
			return '/teacher/paperDetail/id=' + id
		case 'allQue':
			if (id == -1) {
				return '/teacher/questions'
			}
			return '/teacher/questions/paperId=' + id
		case 'class':
			return '/teacher/class'
		case 'classDetail':
			return '/teacher/classDetail/classId=' + id

	}
}