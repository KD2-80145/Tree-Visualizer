import './App.css';
import {
	BinaryTreeNode,
	drawBinaryTree,
	VisualizationType,
} from 'binary-tree-visualizer/lib';
import { useCallback, useEffect, useRef, useState } from 'react';
import { stringToArray } from './utils/stringToArray';
import { insert } from './utils/binarySearchTree';

function App() {
	// For storing the raw string
	const [rawArr, setRawArr] = useState('');

	// For storing the root node
	const [root, setRoot] = useState(null);

	// For storing the canvas ref
	const canvasRef = useRef(null);

	/**
	 * Draw Tree
	 */
	const drawTree = useCallback(() => {
		drawBinaryTree(root, canvasRef.current, {
			type: VisualizationType.HIGHLIGHT,
			maxHeight: 0,
		});
	}, [root]);

	/**
	 * Handle Input
	 */
	const handleInput = useCallback(
		(e) => {
			setRawArr(e.target.value);
		},
		[setRawArr]
	);

	/**
	 * Handle click
	 */
	const handleClick = useCallback(() => {
		const [isValid, arr] = stringToArray(rawArr);

		if (!isValid) {
			alert('WRONG INPUT');
			setRawArr('');
			return;
		}

		const [firstNumber, ...restArr] = arr;
		const root = new BinaryTreeNode(firstNumber);
		restArr.forEach((num) => {
			insert(root, num);
		});

		setRoot(root);
		setRawArr('');
	}, [rawArr]);

	/**
	 * Adding handler and draw tree
	 */
	useEffect(() => {
		if (root) {
			drawTree();
		}

		const resizeHandler = () => {
			drawTree();
		};
		window.addEventListener('resize', resizeHandler);

		return () => {
			window.removeEventListener('resize', resizeHandler);
		};
	}, [drawTree, root]);

	return (
		<div>
			<header>
				<input
					type="text"
					value={rawArr}
					onChange={handleInput}
					id="box"
				/>
				<br />
				<button onClick={handleClick}>Draw</button>
			</header>
			<main>
				<canvas ref={canvasRef}></canvas>
			</main>
		</div>
	);
}

export default App;
