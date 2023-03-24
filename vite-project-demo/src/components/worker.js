onmessage = (e) => {
    if (e.data.type == 'init') {
        let mock = e.data.data
        mock = JSON.parse(mock)
        let arrayMap = new Map()
        for (let key in mock.nodes) {
            if (arrayMap.has(mock.nodes[key].layer)) {
                arrayMap.set(mock.nodes[key].layer, [
                    ...arrayMap.get(mock.nodes[key].layer),
                    mock.nodes[key],
                ])
            } else {
                arrayMap.set(mock.nodes[key].layer, [mock.nodes[key]])
            }
        }
        const _arrayMap = Array.from(arrayMap)
        _arrayMap.sort((a, b) => {
            return String(a[0]).localeCompare(String(b[0]))
        })
        arrayMap = new Map(_arrayMap.map((i) => [i[0], i[1]]))
        let x = 0,
            y = 0,
            nodesList = [],
            max = 0
        // 获取最长数组
        arrayMap.forEach((value) => {
            if (value.length > max) {
                max = value.length
            }
        })
        arrayMap.forEach((value, key) => {
            arrayMap.get(key).forEach((ele, j, arr) => {
                nodesList.push({
                    ...ele,
                    id: `${ele.id}`,
                    category: key,
                    itemStyle: {
                        opacity: 1,
                    },
                    symbol: ele.id % 2 == 0 ? 'rect' : 'circle',
                    gapY: (max * 200) / (arr.length + 1),
                    line: mock.edges[`${ele.id}`] || [ele.id],
                    // x: x + i * 300,
                    x: + (x + ((max * 200) / arrayMap.size) * key).toFixed(2),
                    y: + (y + ((max * 200) / (arr.length + 1)) * (j + 1)).toFixed(2),
                })
            })
        })
        // for (let i = 0; i <= arrayMap.size; i++) {
        //     console.log(arrayMap.get(i))
        //     arrayMap.get(i)?.forEach((ele, j, arr) => {
        //         console.log(ele.id)
        //         nodesList.push({
        //             ...ele,
        //             id: `${ele.id}`,
        //             category: i,
        //             itemStyle: {
        //                 opacity: 1,
        //             },
        //             line: mock.edges[`${ele.id}`] || [ele.id],
        //             // x: x + i * 300,
        //             x: x + ((max * 100) / arrayMap.size) * i,
        //             y: y + ((max * 100) / (arr.length + 1)) * (j + 1),
        //         })
        //     })
        // }
        // 计算 线条弧度
        let linkList = mock.edges.map((ele) => {
            let curveness = 0
            let sourceNode = nodesList.find((nodeEle) => nodeEle.id == ele[0])
            let targetNode = nodesList.find((nodeEle) => nodeEle.id == ele[1])
            // console.log(sourceNode, targetNode)
            let xDiff = sourceNode.layer - targetNode.layer
            // 判断X层级
            switch (Math.abs(xDiff)) {
                // X层级相同
                case 0:
                    // y相隔一层
                    curveness =
                        Math.abs(sourceNode.y - targetNode.y) <= sourceNode.gapY
                            ? 0
                            : 0.1
                    // curveness = sourceNode.x - targetNode.x == 0 ? 0 : 0.1
                    break
                // X相隔一层
                case 1:
                    // y相隔一层
                    if (sourceNode.y > targetNode.y) {
                        curveness = 0.1
                    } else if (sourceNode.y < targetNode.y) {
                        curveness = -0.1
                    } else {
                        curveness = 0
                    }
                    break
                // X相隔多层
                default:
                    if (sourceNode.y > targetNode.y) {
                        curveness = 0.1
                    } else if (sourceNode.y < targetNode.y) {
                        curveness = -0.1
                    } else {
                        curveness = 0.1
                    }
                    break
            }
            return {
                id: `${ele[0]}-${ele[1]}`,
                source: `${ele[0]}`,
                target: `${ele[1]}`,
                lineStyle: {
                    curveness: curveness,
                },
            }
        })
        postMessage({
            nodesList,
            linkList,
        })
    }
    if (e.data.type == 'opacity0.1') {
        e.data.data.forEach((node) => {
            node.itemStyle.opacity = 0.1
        })
        postMessage(e.data.data)
    }
    if (e.data.type == 'opacity1') {
        e.data.data.forEach((node) => {
            if (
                e.data.current['line'].includes(+node.id) ||
                e.data.current.id == +node.id
            ) {
                node.itemStyle.opacity = 1
            }
        })
        postMessage(e.data.data)
    }
}
