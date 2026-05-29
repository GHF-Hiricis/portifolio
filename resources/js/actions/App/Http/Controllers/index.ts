import ProjectController from './ProjectController'
import ProjectGalleryController from './ProjectGalleryController'
import Settings from './Settings'


const Controllers = {
    ProjectController: Object.assign(ProjectController, ProjectController),
    ProjectGalleryController: Object.assign(ProjectGalleryController, ProjectGalleryController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers