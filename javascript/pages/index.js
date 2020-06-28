let setWebNodeLines = () => {
    let centreNodeContainerElement = document.getElementById('home__web__node-container--centre');
    let centreNodeContainer = new CentreNodeContainer(centreNodeContainerElement);

    let nodeContainers = document.getElementsByClassName('home__web__node-container--child');
    let numberOfContainers = nodeContainers.length;
    for (let i = 0; i < numberOfContainers; i++) {
        new ChildNodeContainer(nodeContainers[i], centreNodeContainer);
    }
}

window.addEventListener('load', setWebNodeLines);
window.addEventListener('resize', setWebNodeLines);

class NodeContainer {
    constructor(element) {
        this.element = element;

        this.setPositionAttributes(element);

        this.xCoordinate = this.getXCentre(this.left, this.right)
        this.yCoordinate = this.getYCentre(this.top, this.bottom)
    }
    setPositionAttributes(element) {
        let positions = element.getClientRects();
        if (positions.length != 1) {
            return false;
        }
        let position = positions[0];
        this.top = position.top;
        this.bottom = position.bottom;
        this.left = position.left;
        this.right = position.right;

    }
    getPosition(element) {
        let positions = element.getClientRects();
        return positions[0];
    }
    getXCentre(left, right) {
        return (left + right) / 2;
    }
    getYCentre(top, bottom) {
        return (top + bottom) / 2;
    }
}

class CentreNodeContainer extends NodeContainer {
    constructor(element) {
        super(element);
    }

}

class ChildNodeContainer extends NodeContainer {
    constructor(element, centreNode) {
        super(element);
        this.centreNode = centreNode;
        this.line = this.fetchLineElement(element);
        if (this.line == false) {
            // Hide Element
        }
        this.line.setLinePositions(this.xCoordinate, this.centreNode.xCoordinate, this.yCoordinate, this.centreNode.yCoordinate);
    }
    fetchLineElement(element) {
        let lineElements = element.getElementsByClassName('home__web__node__connector-line');
        if (lineElements.length != 1) {
            return false;
        }
        let lineElement = lineElements[0];
        let lineObject = new Line(lineElement);
        return lineObject;
    }
}

class Line {
    constructor(element) {
        this.element = element;
    }

    setLinePositions(childNodeX, centreNodeX, childNodeY, centreNodeY) {
        this.element.attributes.x1.value = childNodeX;
        this.element.attributes.y1.value = childNodeY;


        this.element.attributes.x2.value = centreNodeX;
        this.element.attributes.y2.value = centreNodeY;
    }
}